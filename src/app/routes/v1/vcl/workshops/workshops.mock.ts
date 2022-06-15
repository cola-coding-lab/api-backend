import { WorkshopDetail, WorkshopOverview, LessonOverview } from '@routes/v1/vcl/workshops/workshops';
import { File } from '@util/file/file.model';
import { FileTree } from '@util/file/file-reader';
import path from 'path';
import { PATHS } from '@config/environment';

export const WorkshopOverviewMock: WorkshopOverview[] = [];
export const WorkshopDetailsMock: WorkshopDetail[] = [];

const workshopFolder = path.join(PATHS.ASSETS, 'workshopData');
const workshopFileTree: File = FileTree(workshopFolder, true);

workshopFileTree.children.forEach((workshop) => {
  const workshopMetaFile = workshop.children.find((x) => x.name === 'meta.json');
  const workshopMetaData = JSON.parse(workshopMetaFile.content);
  const lessonsMeta: LessonOverview[] = [];
  WorkshopOverviewMock.push(workshopMetaData.meta);
  workshopMetaData.lessons.forEach((lesson: any) => {
    lessonsMeta.push(lesson.meta);
  });
  WorkshopDetailsMock.push({
    ...workshopMetaData.meta,
    lessonsCount: workshopMetaData.lessons.length,
    lessons: lessonsMeta,
  });
});
