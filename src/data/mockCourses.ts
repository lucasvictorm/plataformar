import type { Course } from "../types/course";

export const courses: Course[] = [
  {
    name: "React",
    modules: [
      {
        name: "Fundamentos",
        lessons: [
          { title: "Introdução ao React", duration: 5, done: true },
          { title: "JSX na prática", duration: 6, done: true },
          { title: "Componentes", duration: 8, done: false },
        ],
      },
      {
        name: "Hooks",
        lessons: [
          { title: "useState", duration: 7, done: true },
          { title: "useEffect", duration: 9, done: false },
          { title: "Custom Hooks", duration: 10, done: false },
        ],
      },
    ],
  },
  {
    name: "JavaScript Avançado",
    modules: [
      {
        name: "Fundamentos Avançados",
        lessons: [
          { title: "Closures", duration: 10, done: true },
          { title: "Hoisting", duration: 8, done: true },
          { title: "Escopo", duration: 7, done: false },
        ],
      },
      {
        name: "Programação Assíncrona",
        lessons: [
          { title: "Promises", duration: 12, done: true },
          { title: "Async/Await", duration: 10, done: false },
          { title: "Fetch API", duration: 9, done: false },
        ],
      },
      {
        name: "Conceitos Avançados",
        lessons: [
          { title: "Event Loop", duration: 15, done: false },
          { title: "Prototype", duration: 12, done: false },
        ],
      },
    ],
  },
];
