import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "./electron/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Courses ──────────────────────────────────────────────

ipcMain.handle("db:getCourses", () => {
  return db.prepare("SELECT * FROM courses").all();
});

ipcMain.handle("db:getCourse", (_, id) => {
  return db.prepare("SELECT * FROM courses WHERE id = ?").get(id);
});

ipcMain.handle("db:addCourse", (_, name) => {
  return db.prepare("INSERT INTO courses (name) VALUES (?)").run(name);
});

// ─── Modules ──────────────────────────────────────────────

ipcMain.handle("db:getModules", (_, courseId) => {
  return db.prepare("SELECT * FROM modules WHERE course_id = ?").all(courseId);
});

ipcMain.handle("db:addModule", (_, courseId, name) => {
  return db
    .prepare("INSERT INTO modules (course_id, name) VALUES (?, ?)")
    .run(courseId, name);
});

// ─── Lessons ──────────────────────────────────────────────

ipcMain.handle("db:getLessons", (_, moduleId) => {
  const rows = db
    .prepare("SELECT * FROM lessons WHERE module_id = ?")
    .all(moduleId);
  return rows.map((row) => ({ ...row, done: row.done === 1 }));
});

ipcMain.handle("db:addLesson", (_, moduleId, title, duration) => {
  return db
    .prepare(
      "INSERT INTO lessons (module_id, title, duration) VALUES (?, ?, ?)",
    )
    .run(moduleId, title, duration ?? null);
});

ipcMain.handle("db:markLessonDone", (_, lessonId) => {
  return db.prepare("UPDATE lessons SET done = 1 WHERE id = ?").run(lessonId);
});

ipcMain.handle("db:markLessonUndone", (_, lessonId) => {
  return db.prepare("UPDATE lessons SET done = 0 WHERE id = ?").run(lessonId);
});

// ─── Janela ───────────────────────────────────────────────

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "/electron/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
