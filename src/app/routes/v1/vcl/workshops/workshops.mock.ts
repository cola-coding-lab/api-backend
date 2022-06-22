/* eslint-disable linebreak-style */

// import { WorkshopDetail, WorkshopOverview, LessonOverview } from '@routes/v1/vcl/workshops/workshops';
// import { File } from '@util/file/file.model';
// import { FileTree } from '@util/file/file-reader';
// import path from 'path';
// import { PATHS } from '@config/environment';

// export const WorkshopOverviewMock: WorkshopOverview[] = [];
// export const WorkshopDetailsMock: WorkshopDetail[] = [];

// const workshopFolder = path.join(PATHS.ASSETS, 'workshopData');
// const workshopFileTree: File = FileTree(workshopFolder, true);

// workshopFileTree.children.forEach((workshop) => {
//   const workshopMetaFile = workshop.children.find((x) => x.name === 'meta.json');
//   const workshopMetaData = JSON.parse(workshopMetaFile.content);
//   const lessonsMeta: LessonOverview[] = [];
//   WorkshopOverviewMock.push(workshopMetaData.meta);
//   workshopMetaData.lessons.forEach((lesson: any) => {
//     lessonsMeta.push(lesson.meta);
//   });
//   WorkshopDetailsMock.push({
//     ...workshopMetaData.meta,
//     lessonsCount: workshopMetaData.lessons.length,
//     lessons: lessonsMeta,
//   });
// });

import { WorkshopDetail, WorkshopOverview, Step, Lesson, Code } from '@routes/v1/vcl/workshops/workshops';
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
    const lessonFolder: File = workshop.children.find((x) => x.name === lesson.meta.id);
    
    //only iterate through steps, if corresponding folders exist
    if (typeof lessonFolder !== 'undefined') {
      lesson.steps.forEach((step: any) => {
        const stepFolder: File = lessonFolder.children.find((x) => x.name === step.id);
        const codeData: Code[] = [];

        //build code data from files in the folder of the current step
        stepFolder.children.forEach((codeFile: File) => {
          codeData.push({
            name: codeFile.name,
            type: 'text/javascript',
            content: codeFile.content,
          });
        });

        stepsData.push({
          ...step,
          code: codeData,
        });
      });
    }

    lessonsData.push({
      ...lesson.meta,
      steps: stepsData,
    });
  });

  WorkshopDetailsMock.push({
    ...workshopMetaData.meta,
    lessonsCount: workshopMetaData.lessons.length,
    lessons: lessonsData,
  });
});
