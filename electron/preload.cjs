// electron/preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("db", {
  // Courses
  getCourses: () => ipcRenderer.invoke("db:getCourses"),
  getCourse: (id) => ipcRenderer.invoke("db:getCourse", id),
  addCourse: (name) => ipcRenderer.invoke("db:addCourse", name),

  // Modules
  getModules: (courseId) => ipcRenderer.invoke("db:getModules", courseId),
  addModule: (courseId, name) =>
    ipcRenderer.invoke("db:addModule", courseId, name),

  // Lessons
  getLessons: (moduleId) => ipcRenderer.invoke("db:getLessons", moduleId),
  addLesson: (moduleId, title, duration) =>
    ipcRenderer.invoke("db:addLesson", moduleId, title, duration),
  markLessonDone: (lessonId) =>
    ipcRenderer.invoke("db:markLessonDone", lessonId),
  markLessonUndone: (lessonId) =>
    ipcRenderer.invoke("db:markLessonUndone", lessonId),
});
