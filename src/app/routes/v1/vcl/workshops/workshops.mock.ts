import { WorkshopDetail, WorkshopOverview } from '@routes/v1/vcl/workshops/workshops';

export const WorkshopOverviewMock: WorkshopOverview[] = [
  {
    id: '123',
    title: 'coding',
    description: 'coding is nice',
    image: '',
    lessonsCount: 3,
    difficulty: 'easy',
    categories: ['coding'],
  },
];

export const WorkshopDetailsMock: WorkshopDetail[] = WorkshopOverviewMock.map(ws => {
  return {
    ...ws, lessonsCount: undefined, lessons: [
      {
        id: '1',
        title: 'first',
        stepsCount: 1,
      },
      {
        id: '2',
        title: 'second',
        stepsCount: 1,
      },
      {
        id: '3',
        title: 'third',
        stepsCount: 2,
      },
    ],
  };
});
