/* eslint-disable linebreak-style */
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
  description: string;
  stepsCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  image: string;
  steps: Step[];
  codeFiles: CodeFile[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  isOptional: boolean;
  hint: string;
}

export interface CodeFile {
  name: string;
  type: string;
  content: string;
}
