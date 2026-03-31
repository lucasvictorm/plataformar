export {};

declare global {
  interface Window {
    db: {
      getCourses: () => Promise<Course[]>;
      getCourse: (id: number) => Promise<Course>;
      addCourse: (name: string) => Promise<void>;
      getModules: (courseId: number) => Promise<Module[]>;
      addModule: (courseId: number, name: string) => Promise<void>;
      getLessons: (moduleId: number) => Promise<Lesson[]>;
      addLesson: (
        moduleId: number,
        title: string,
        duration?: number,
      ) => Promise<void>;
      markLessonDone: (lessonId: number) => Promise<void>;
      markLessonUndone: (lessonId: number) => Promise<void>;
    };
  }
}

interface Lesson {
  id: number;
  title: string;
  duration?: number;
  done: boolean;
}

interface Module {
  id: number;
  name: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  name: string;
  modules: Module[];
}
