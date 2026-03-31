import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), "app.db")
  : path.join(__dirname, "../app.db");

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS modules (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    name      TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER NOT NULL,
    title     TEXT NOT NULL,
    duration  INTEGER,
    done      INTEGER DEFAULT 0,
    FOREIGN KEY (module_id) REFERENCES modules(id)
  );
`);

console.log("Banco iniciado em:", dbPath);
