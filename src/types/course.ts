export type Lesson = {
  title: string;
  done: boolean;
};

export type Module = {
  name: string;
  lessons: Lesson[];
};

export type Course = {
  name: string;
  modules: Module[];
};
