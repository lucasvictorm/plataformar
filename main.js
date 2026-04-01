import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "./electron/db.js";
import fs from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Courses ──────────────────────────────────────────────

// ─── Filesystem ───────────────────────────────────────────
import { dialog } from "electron";

ipcMain.handle("fs:selectFolder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled) return null;

  return result.filePaths[0];
});

ipcMain.handle("fs:importCourse", async (_, caminhoCurso) => {
  try {
    const nomeCurso = caminhoCurso.split(/[\\/]/).pop();

    // 1. Criar curso
    const courseResult = db
      .prepare("INSERT INTO courses (name) VALUES (?)")
      .run(nomeCurso);

    const courseId = courseResult.lastInsertRowid;

    const itens = await fs.readdir(caminhoCurso, {
      withFileTypes: true,
    });

    let moduloGeralId = null;

    for (const item of itens) {
      const caminhoItem = join(caminhoCurso, item.name);

      // 📁 SE FOR PASTA → módulo normal
      if (item.isDirectory()) {
        const moduleResult = db
          .prepare("INSERT INTO modules (course_id, name) VALUES (?, ?)")
          .run(courseId, item.name);

        const moduleId = moduleResult.lastInsertRowid;

        const arquivos = await fs.readdir(caminhoItem, {
          withFileTypes: true,
        });

        for (const arquivo of arquivos) {
          if (!arquivo.isFile()) continue;

          db.prepare(
            "INSERT INTO lessons (module_id, title, duration) VALUES (?, ?, ?)",
          ).run(moduleId, arquivo.name, null);
        }
      }

      // 📄 SE FOR ARQUIVO → módulo "Geral"
      else if (item.isFile()) {
        // cria módulo geral só uma vez
        if (!moduloGeralId) {
          const moduleResult = db
            .prepare("INSERT INTO modules (course_id, name) VALUES (?, ?)")
            .run(courseId, "Geral");

          moduloGeralId = moduleResult.lastInsertRowid;
        }

        db.prepare(
          "INSERT INTO lessons (module_id, title, duration) VALUES (?, ?, ?)",
        ).run(moduloGeralId, item.name, null);
      }
    }

    return { success: true };
  } catch (erro) {
    console.error("Erro ao importar curso:", erro);
    return { success: false, error: erro.message };
  }
});
ipcMain.handle("fs:readDir", async (_, caminho) => {
  try {
    const itens = await fs.readdir(caminho, { withFileTypes: true });

    return itens.map((item) => ({
      nome: item.name,
      tipo: item.isDirectory() ? "pasta" : "arquivo",
      caminhoCompleto: join(caminho, item.name),
    }));
  } catch (erro) {
    console.error("Erro ao ler pasta:", erro);
    return [];
  }
});
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
