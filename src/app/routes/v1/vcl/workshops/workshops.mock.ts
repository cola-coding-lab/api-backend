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
import { PATHS } from '@config/environment';

export const WorkshopOverviewMock: WorkshopOverview[] = [];
export const WorkshopDetailsMock: WorkshopDetail[] = [];

const imageExtensions = ['.png', '.jpg', '.jpeg'];

const workshopFolder = path.join(PATHS.ASSETS, 'workshopData');
const workshopFileTree: File = FileTree(workshopFolder, true);

//iterate through workshops
workshopFileTree.children.forEach((workshop: File) => {
  const workshopMetaFile: File = workshop.children.find((x) => x.name === 'meta.json');
  const workshopLessonsFolder: File = workshop.children.find((x) => x.name === 'lessons');
  const workshopDescriptionFile: File = workshop.children.find((x) => x.name === 'description.md');
  const workshopMetaFileContent = JSON.parse(workshopMetaFile.content).workshop;
  const workshopImageFile = workshop.children.find((x) => imageExtensions.includes(x?.ext));

  //build workshopOverview
  const workshopOverview: WorkshopOverview = {
    ...workshopMetaFileContent,
    lessonsCount: workshopLessonsFolder.children.length,
    image: workshopImageFile?.absolutePath,
  };
  if (typeof workshopDescriptionFile !== 'undefined') {
    workshopOverview.description = workshopDescriptionFile.content;
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
    const lessonImageFile: File = lesson.children.find((x) => imageExtensions.includes(x?.ext));
    const lessonDescriptionFile: File = lesson.children.find((x) => x.name === 'description.md');

    //build lessonsOverview
    const lessonOverview: LessonOverview = {
      ...lessonMetaFileContent,
      stepsCount: lessonStepFolder.children.length,
    };
    if (typeof lessonDescriptionFile !== 'undefined') {
      lessonOverview.description = lessonDescriptionFile.content;
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
          stepImages.push(file.absolutePath);
        }
      });

      const stepDetail: Step = {
        ...stepMetaFileContent,
        images: stepImages,
      };
      if (typeof stepDescriptionFile !== 'undefined') {
        stepDetail.description = stepDescriptionFile.content;
      }
      steps.push(stepDetail);
    });

    lessonsDetail.push({
      ...lessonOverview,
      image: lessonImageFile?.absolutePath,
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
