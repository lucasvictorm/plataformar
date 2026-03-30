import type { Course } from "../types/course";

export const courses: Course[] = [
  {
    id: 1,
    name: "React",
    modules: [
      {
        id: 1,
        name: "Fundamentos",
        lessons: [
          { id: 1, title: "Introdução ao React", duration: 5, done: true },
          { id: 2, title: "JSX na prática", duration: 6, done: true },
          { id: 3, title: "Componentes", duration: 8, done: false },
        ],
      },
      {
        id: 2,
        name: "Hooks",
        lessons: [
          { id: 4, title: "useState", duration: 7, done: true },
          { id: 5, title: "useEffect", duration: 9, done: false },
          { id: 6, title: "Custom Hooks", duration: 10, done: false },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "JavaScript Avançado",
    modules: [
      {
        id: 1,
        name: "Fundamentos Avançados",
        lessons: [
          { id: 7, title: "Closures", duration: 10, done: true },
          { id: 8, title: "Hoisting", duration: 8, done: true },
          { id: 9, title: "Escopo", duration: 7, done: false },
        ],
      },
      {
        id: 4,
        name: "Programação Assíncrona",
        lessons: [
          { id: 10, title: "Promises", duration: 12, done: true },
          { id: 11, title: "Async/Await", duration: 10, done: false },
          { id: 12, title: "Fetch API", duration: 9, done: false },
        ],
      },
      {
        id: 5,
        name: "Conceitos Avançados",
        lessons: [
          { id: 13, title: "Event Loop", duration: 15, done: false },
          { id: 14, title: "Prototype", duration: 12, done: false },
        ],
      },
    ],
  },
];
