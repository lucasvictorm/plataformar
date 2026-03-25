import type { Course } from "../types/course";

export const courses: Course[] = [
  {
    name: "Receitas",
    modules: [
      {
        name: "Almoço",
        lessons: [
          {
            title: "Frango frito",
            done: true,
          },
          {
            title: "Farofa",
            done: false,
          },
        ],
      },
      {
        name: "Jantar",
        lessons: [
          {
            title: "Pizza",
            done: true,
          },
          {
            title: "Tapioca",
            done: false,
          },
        ],
      },
    ],
  },
];
