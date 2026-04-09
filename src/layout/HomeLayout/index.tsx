import { BookOpen, Folder, Plus } from "lucide-react";
import MainContent from "../../components/MainContent";
import MainButton from "../../components/MainButton";
import type { Course } from "../../types/course";
import CoursePill from "../../components/CoursePill";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";

import {
  getTotalCompletedLessons,
  getTotalLessons,
} from "../../utils/course.ts";
import { useEffect } from "react";

type Props = {
  courses: Course[];
  reloadCourses: () => Promise<void>;
};

function HomeLayout({ courses, reloadCourses }: Props) {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      reloadCourses();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (courses.length === 0) {
      navigate("/", { replace: true });
    }
  }, [courses]);
  async function handleImport() {
    try {
      // 1. Abrir seletor de pasta
      const caminho = await window.fs.selectFolder();

      if (!caminho) return;

      // 2. Importar curso
      const res = await window.fs.importCourse(caminho);

      if (res.success) {
        await reloadCourses();
      } else {
        alert("Erro ao importar: " + res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    }
  }

  const totalCourses = courses.length;

  const totalCompleted = courses.reduce(
    (acc, course) => acc + getTotalCompletedLessons(course),
    0,
  );

  const totalLessons = courses.reduce(
    (acc, course) => acc + getTotalLessons(course),
    0,
  );
  return (
    <div className="flex flex-1 w-full">
      <Sidebar>
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Lista de cursos
            </h3>
            <MainButton onClick={handleImport}>
              <Plus size={20} color="#90a1b9" />
            </MainButton>
          </div>
          <div className="flex flex-col gap-2">
            {courses.map((course) => {
              let finisheds: number = getTotalCompletedLessons(course);
              let totalLessons = getTotalLessons(course);
              return (
                <CoursePill
                  id={course.id}
                  title={course.name}
                  completedLessons={finisheds}
                  totalLessons={totalLessons}
                />
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-800/30">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Folder className="h-3.5 w-3.5" />
              <span>Total de cursos</span>
            </div>
            <span className="font-semibold text-blue-400">{totalCourses}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Aulas completas</span>
            </div>
            <span className="font-semibold text-blue-400">
              {totalCompleted}/{totalLessons}
            </span>
          </div>
        </div>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}

export default HomeLayout;
