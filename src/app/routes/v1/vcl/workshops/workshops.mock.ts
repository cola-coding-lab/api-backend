/* eslint-disable linebreak-style */
import {
  WorkshopDetail,
  WorkshopOverview,
  LessonOverview,
  Step,
  Lesson,
  CodeFile,
} from '@routes/v1/vcl/workshops/workshops';
import { File } from '@util/file/file.model';
import { FileTree } from '@util/file/file-reader';
import path from 'path';
import { PATHS, PORT } from '@config/environment';
import { Request } from 'express';

export function getWorkshopData(req: Request) {
  const urlAssets = `${req.protocol}://${req.hostname}:${PORT}${req.originalUrl}/assets`;
  const imageExtensions = ['.png', '.jpg', '.jpeg'];
  const mdImgRegex = /(!\[[\s\S.]*\])\(.+\.png|\.jpe?g\)/g;

  const WorkshopOverviewMock: WorkshopOverview[] = [];
  const WorkshopDetailsMock: WorkshopDetail[] = [];

  const workshopFolder = path.join(PATHS.ASSETS, 'workshopData');
  const workshopFileTree: File = FileTree(workshopFolder, true);

  //iterate through workshops
  workshopFileTree.children.forEach((workshop: File) => {
    const workshopMetaFile: File = workshop.children.find((x) => x.name === 'meta.json');
    const workshopLessonsFolder: File = workshop.children.find((x) => x.name === 'lessons');
    const workshopDescriptionFile: File = workshop.children.find((x) => x.name === 'description.md');
    const workshopMetaFileContent = JSON.parse(workshopMetaFile.content).workshop;
    const workshopAssets: string[] = [];

    //find Images
    workshop.children.forEach((file: File) => {
      if (imageExtensions.includes(file?.ext)) {
        workshopAssets.push(`${urlAssets}/${file.name}`);
      }
    });

    //build workshopOverview
    const workshopOverview: WorkshopOverview = {
      ...workshopMetaFileContent,
      lessonsCount: workshopLessonsFolder.children.length,
      assets: workshopAssets,
    };

    //edit description
    if (typeof workshopDescriptionFile !== 'undefined') {
      workshopOverview.description = _editDescription(workshopDescriptionFile, 'workshop');
    }

    WorkshopOverviewMock.push(workshopOverview);

    //build workshopDetail
    const lessonsOverview: LessonOverview[] = [];
    const lessonsDetail: Lesson[] = [];

    //iterate through lessons
    workshopLessonsFolder.children.forEach((lesson: File) => {
      const lessonMetaFile: File = lesson.children.find((x) => x.name === 'meta.json');
      const lessonMetaFileContent = JSON.parse(lessonMetaFile.content).lesson;
      const lessonCodeFolder: File = lesson.children.find((x) => x.name === 'code');
      const lessonStepFolder: File = lesson.children.find((x) => x.name === 'steps');
      const lessonAssets: string[] = [];
      const lessonDescriptionFile: File = lesson.children.find((x) => x.name === 'description.md');

      //find Images
      lesson.children.forEach((file: File) => {
        if (imageExtensions.includes(file?.ext)) {
          lessonAssets.push(`${urlAssets}/lessons/${lesson.name}/${file.name}`);
        }
      });

      //build lessonsOverview
      const lessonOverview: LessonOverview = {
        ...lessonMetaFileContent,
        stepsCount: lessonStepFolder.children.length,
      };

      if (typeof lessonDescriptionFile !== 'undefined') {
        //lessonOverview.description = lessonDescriptionFile.content;
        lessonOverview.description = _editDescription(lessonDescriptionFile, 'lesson', lesson.name);
      }
      lessonsOverview.push(lessonOverview);

      //build lessonsDetail
      const steps: Step[] = [];
      const codeFiles: CodeFile[] = [];

      //iterate through codeFiles
      lessonCodeFolder.children.forEach((codeFile: File) => {
        codeFiles.push({
          name: codeFile.name,
          type: 'text/javascript',
          content: codeFile.content,
        });
      });

      //iterate through steps
      lessonStepFolder.children.forEach((step: File) => {
        const stepMetaFile: File = step.children.find((x) => x.name === 'meta.json');
        const stepMetaFileContent = JSON.parse(stepMetaFile.content).step;
        const stepDescriptionFile: File = step.children.find((x) => x.name === 'description.md');
        const stepImages: string[] = [];

        //find images
        step.children.forEach((file: File) => {
          if (imageExtensions.includes(file?.ext)) {
            stepImages.push(`${urlAssets}/lessons/${lesson.name}/steps/${step.name}/${file.name}`);
          }
        });

        const stepDetail: Step = {
          ...stepMetaFileContent,
          assets: stepImages,
        };
        if (typeof stepDescriptionFile !== 'undefined') {
          stepDetail.description = _editDescription(stepDescriptionFile, 'step', lesson.name, step.name);
        }
        steps.push(stepDetail);
      });

      lessonsDetail.push({
        ...lessonOverview,
        assets: lessonAssets,
        codeFiles: codeFiles,
        steps: steps,
      });
    });

    const workshopDetail: WorkshopDetail = {
      ...workshopOverview,
      lessonsOverview: lessonsOverview,
      lessons: lessonsDetail,
    };

    WorkshopDetailsMock.push(workshopDetail);
  });

  return {
    WorkshopOverviewMock: WorkshopOverviewMock,
    WorkshopDetailsMock: WorkshopDetailsMock,
  };

  /* ***************************************************************************************************** */
  function _editDescription(mdFile: File, type: string, lessonName?: string, stepName?: string) {
    let description = mdFile?.content;
    if (Array.isArray(description.match(mdImgRegex)) === true) {
      let replaceString: string;
      switch (type) {
        case 'workshop':
          replaceString = `$1(${urlAssets}/$2)`;
          break;
        case 'lesson':
          replaceString = `$1(${urlAssets}/lessons/${lessonName}/$2)`;
          break;
        case 'step':
          replaceString = `$1(${urlAssets}/lessons/${lessonName}/steps/${stepName}/$2)`;
          break;
      }

      description = mdFile.content.replaceAll(
        ///(!\[[\s\S]*\])\((.+\.png|\.jpe?g)\)/,
        ///(!\[[\s\S]*?\])\(.+\/(.*\.png|\.jpe?g)\)/g,
        /(!\[[\s\S]*?\])\((?!https?:\/\/).+\/(.*\.png|\.jpe?g)\)/g,
        replaceString
      );
    }
    return description;
  }
}
