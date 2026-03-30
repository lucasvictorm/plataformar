export type Lesson = {
  id: number;
  title: string;
  duration?: number;
  done: boolean;
};

export type Module = {
  id: number;
  name: string;
  lessons: Lesson[];
};

export type Course = {
  id: number;
  name: string;
  modules: Module[];
};
