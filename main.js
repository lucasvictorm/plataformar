import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "./electron/db.js";
import fs from "fs/promises";
import { createReadStream, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { dialog } from "electron";

import { protocol, net } from "electron";

import { pathToFileURL } from "url";

import ffmpeg from "fluent-ffmpeg";
import ffprobeStatic from "ffprobe-static";

ffmpeg.setFfprobePath(ffprobeStatic.path);

function getVideoDuration(caminhoArquivo) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(caminhoArquivo, (err, metadata) => {
      if (err) return reject(err);

      const duration = metadata.format.duration; // duração em segundos
      resolve(duration || 0);
    });
  });
}

ipcMain.handle("db:deleteCourse", (_, id) => {
  return db.prepare("DELETE FROM courses WHERE id = ?").run(id);
});

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

    const itens = await fs.readdir(caminhoCurso, { withFileTypes: true });

    let moduloGeralId = null;

    for (const item of itens) {
      const caminhoItem = join(caminhoCurso, item.name);

      // 📁 SE FOR PASTA → módulo normal
      if (item.isDirectory()) {
        const moduleResult = db
          .prepare("INSERT INTO modules (course_id, name) VALUES (?, ?)")
          .run(courseId, item.name);
        const moduleId = moduleResult.lastInsertRowid;

        const arquivos = await fs.readdir(caminhoItem, { withFileTypes: true });

        for (const arquivo of arquivos) {
          if (!arquivo.isFile()) continue;

          const caminhoArquivo = join(caminhoItem, arquivo.name);
          let duracao = 0;

          try {
            duracao = await getVideoDuration(caminhoArquivo);
          } catch (e) {
            console.warn(
              "Não foi possível ler a duração do vídeo:",
              arquivo.name,
            );
          }

          db.prepare(
            "INSERT INTO lessons (module_id, title, duration, video_path) VALUES (?, ?, ?, ?)",
          ).run(moduleId, arquivo.name, duracao, caminhoArquivo);
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

        const caminhoArquivo = join(caminhoCurso, item.name);
        let duracao = 0;

        try {
          duracao = await getVideoDuration(caminhoArquivo);
        } catch (e) {
          console.warn("Não foi possível ler a duração do vídeo:", item.name);
        }

        db.prepare(
          "INSERT INTO lessons (module_id, title, duration, video_path) VALUES (?, ?, ?, ?)",
        ).run(moduloGeralId, item.name, duracao, caminhoArquivo);
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
      webSecurity: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(join(__dirname, "../dist/index.html"));
  }
}

ipcMain.handle("video:getPath", (_, videoPath) => {
  return pathToFileURL(videoPath).href;
});

app.whenReady().then(() => {
  

  createWindow();
});
app.on("window-all-closed", () => app.quit());
