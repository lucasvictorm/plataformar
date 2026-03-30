import { FileText, Folder, Play, Plus } from "lucide-react";
import MainButton from "../../components/MainButton";
import { courses } from "../../data/mockCourses";
import {
  getPorcCompleted,
  getTotalCompletedLessons,
  getTotalLessons,
} from "../../utils/course";
import CoursePill from "../../components/CoursePill";
import MainContent from "../../components/MainContent";
import { Outlet, useParams } from "react-router-dom";
import type { Course, Module } from "../../types/course";
import ProgressBar from "../../ui/ProgressBar";
import ScrollArea from "../../ui/ScrollArea";
import { useState } from "react";
import Button from "../../components/Button";
import Sidebar from "../Sidebar";

function CourseLayout() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <div>Curso não encontrado</div>;
  }
  let completedLessons = getTotalCompletedLessons(course);
  let totalLessons = getTotalLessons(course);
  let progress = getPorcCompleted(completedLessons, totalLessons);

  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [currentLesson, setCurrentLesson] = useState<number>(1);

  function toggleModule(idModule: number) {
    setExpandedModules((prev) =>
      prev.includes(idModule)
        ? prev.filter((id) => id !== idModule)
        : [...prev, idModule],
    );
  }

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {" "}
      {/* min-h-0 ajuda no scroll vertical interno */}
      <Sidebar>
        <div className="flex-1 p-5">
          {/* progresso */}
          <div className="p-4 border-b border-slate-800">
            <ProgressBar className="" size={progress} />
            <p>
              {completedLessons} de {totalLessons}
            </p>
          </div>

          {/* lista de módulos */}
          <ScrollArea className="flex-1">
            <div className="p-3">
              {course.modules.map((module) => {
                const isExpanded = expandedModules.includes(module.id);

                return (
                  <div key={module.id}>
                    {/* botão do módulo */}
                    <button onClick={() => toggleModule(module.id)}>
                      {module.name}
                    </button>

                    {/* aulas */}
                    {isExpanded && (
                      <div>
                        {module.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson.id)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left ${
                              currentLesson === lesson.id
                                ? "bg-blue-600/20 border border-blue-500/50"
                                : "hover:bg-slate-800 border border-transparent"
                            }`}
                          >
                            {lesson.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </Sidebar>
      <MainContent>
        {/* O main precisa de min-w-0 para não estourar a largura do flex-1 do MainContent */}
        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          {/* Container do vídeo com proporção fixa */}
          <div className="w-full max-w-full bg-black aspect-video flex items-center justify-center shrink-0">
            <Play size={48} color="#ffffff" fill="#ffffff" />
          </div>

          {/* Info da aula */}
          <div className="bg-slate-900 border-b border-slate-800 p-4 shrink-0">
            <h2 className="text-white font-bold">Primeiro componente</h2>
            <Button title="Marcar como concluído" onClick={() => {}} />
          </div>

          {/* Anotações */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 py-3 border-b border-slate-800 flex items-center gap-2 text-slate-400">
              <FileText size={20} />
              <span>Anotações</span>
            </div>

            <div className="flex-1 p-6">{/* O Textarea deve ficar aqui */}</div>
          </div>
        </main>
      </MainContent>
    </div>
  );
}

export default CourseLayout;
