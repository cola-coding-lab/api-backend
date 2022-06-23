/* eslint-disable linebreak-style */

import { WorkshopDetail, WorkshopOverview, Step, Lesson, CodeFile } from '@routes/v1/vcl/workshops/workshops';
import { File } from '@util/file/file.model';
import { FileTree } from '@util/file/file-reader';
import path from 'path';
import { PATHS } from '@config/environment';

export const WorkshopOverviewMock: WorkshopOverview[] = [];
export const WorkshopDetailsMock: WorkshopDetail[] = [];

const workshopFolder = path.join(PATHS.ASSETS, 'workshopData');
const workshopFileTree: File = FileTree(workshopFolder, true);

workshopFileTree.children.forEach((workshop: File) => {
  const workshopMetaFile = workshop.children.find((x) => x.name === 'meta.json');
  const workshopMetaData = JSON.parse(workshopMetaFile.content);
  const lessonsData: Lesson[] = [];
  WorkshopOverviewMock.push(workshopMetaData.meta);

  //iterate through the content of meta.json and build the detail object
  workshopMetaData.lessons.forEach((lesson: any) => {
    const stepsData: Step[] = [];
    const codeData: CodeFile[] = [];
    const lessonFolder: File = workshop.children.find((x) => x.name === lesson.meta.id);

    lesson.steps.forEach((step: any) => {
      stepsData.push({
        ...step,
      });
    });

    //build codeData from files in the current lesson folder
    lessonFolder?.children.forEach((child: File) => {
      if (child.type === 'file') {
        codeData.push({
          name: child.name,
          type: 'text/javascript',
          content: child.content,
        });
      }
    });

    lessonsData.push({
      ...lesson.meta,
      steps: stepsData,
      codeFiles: codeData,
    });
  });

  WorkshopDetailsMock.push({
    ...workshopMetaData.meta,
    lessonsCount: workshopMetaData.lessons.length,
    lessons: lessonsData,
  });
});
