export interface WorkshopOverview {
  id: string;
  title: string;
  description: string;
  image: string;
  lessonsCount: number;
  difficulty: string;
  categories: string[];
}

export interface WorkshopDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  categories: string[];
  lessons: LessonOverview[];
}

export interface LessonOverview {
  id: string;
  title: string;
  stepsCount: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Lesson {

}
