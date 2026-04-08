const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("db", {
  // Courses
  getCourses: () => ipcRenderer.invoke("db:getCourses"),
  getCourse: (id) => ipcRenderer.invoke("db:getCourse", id),
  addCourse: (name) => ipcRenderer.invoke("db:addCourse", name),
  deleteCourse: (id) => ipcRenderer.invoke("db:deleteCourse", id),

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

contextBridge.exposeInMainWorld("fs", {
  readDir: (caminho) => ipcRenderer.invoke("fs:readDir", caminho),
  importCourse: (caminho) => ipcRenderer.invoke("fs:importCourse", caminho),
  selectFolder: () => ipcRenderer.invoke("fs:selectFolder"),
});

contextBridge.exposeInMainWorld("video", {
  getPath: (path) => ipcRenderer.invoke("video:getPath", path),
});

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),

  onMaximizeChange: (callback) => {
    const listener = (_, isMaximized) => callback(isMaximized);

    ipcRenderer.on("window-is-maximized", listener);

    return () => {
      ipcRenderer.removeListener("window-is-maximized", listener);
    };
  },
});
