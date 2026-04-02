import { CheckCircle2, FileText, Play } from "lucide-react";
import {
  formatDuration,
  getPorcCompleted,
  getTotalCompletedLessons,
  getTotalLessons,
} from "../../utils/course";
import { useParams } from "react-router-dom";
import ProgressBar from "../../ui/ProgressBar";
import ScrollArea from "../../ui/ScrollArea";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import PrimaryActionButton from "../../components/PrimaryActionButton";
import MainTextarea from "../../ui/MainTextArea";
import ModuleItem from "../../components/ModuleItem";
import type { Course } from "../../types/course";
import { useRef } from "react";

function CourseLayout() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState("");

  const isFirstLoad = useRef(true);

  async function loadCourse() {
    const data = await getCourse();
    setCourse(data);

    if (isFirstLoad.current) {
      const firstLesson = getFirstUnfinishedLesson(data);
      setCurrentLesson(firstLesson);

      const moduleId = getModuleIdByLesson(data, firstLesson);

      if (moduleId) {
        setExpandedModules([moduleId]);
      }

      isFirstLoad.current = false; // 🔥 aqui é a chave
    }
  }

  async function getCourse() {
    const course = await window.db.getCourse(Number(id));

    const modules = await window.db.getModules(course.id);

    for (const module of modules) {
      const lessons = await window.db.getLessons(module.id);
      module.lessons = lessons;
    }

    course.modules = modules;
    return course;
  }

  function getFirstUnfinishedLesson(course: Course): number {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.done) {
          return lesson.id;
        }
      }
    }

    return course.modules[0]?.lessons[0]?.id || 0;
  }

  function getModuleIdByLesson(
    course: Course,
    lessonId: number,
  ): number | null {
    for (const module of course.modules) {
      if (module.lessons.some((lesson) => lesson.id === lessonId)) {
        return module.id;
      }
    }
    return null;
  }

  async function markLessonAsDone(id: number) {
    await window.db.markLessonDone(Number(id));
    loadCourse();
  }

  const currentLessonData = course?.modules
    .flatMap((module) =>
      module.lessons.map((lesson) => ({
        ...lesson,
        moduleName: module.name,
      })),
    )
    .find((lesson) => lesson.id === currentLesson);

  useEffect(() => {
    loadCourse();
  }, []);

  useEffect(() => {
    async function loadVideo() {
      if (!currentLessonData?.video_path) {
        setVideoSrc(""); // 🔥 limpa vídeo antigo
        return;
      }

      const path = await window.video.getPath(currentLessonData.video_path);

      setVideoSrc(path);
    }

    loadVideo();
  }, [currentLessonData]);

  useEffect(() => {
    console.log("src atualizado:", videoSrc);
  }, [videoSrc]);

  if (!course) {
    return <div>Curso não encontrado</div>;
  }

  let completedLessons = getTotalCompletedLessons(course);
  let totalLessons = getTotalLessons(course);
  let progress = getPorcCompleted(completedLessons, totalLessons);

  function toggleModule(idModule: number) {
    setExpandedModules((prev) =>
      prev.includes(idModule)
        ? prev.filter((id) => id !== idModule)
        : [...prev, idModule],
    );
  }

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden text-white">
      {" "}
      {/* min-h-0 ajuda no scroll vertical interno */}
      <Sidebar>
        <div className="flex-1 p-5">
          {/* progresso */}
          <div className="p-4 border-b border-slate-800">
            <ProgressBar className="bg-indigo-400" size={progress} />
            <p>
              {completedLessons} de {totalLessons}
            </p>
          </div>

          {/* lista de módulos */}
          <ScrollArea className="flex-1">
            <div className="p-3">
              {course.modules.map((module) => (
                <ModuleItem
                  key={module.id}
                  module={module}
                  isExpanded={expandedModules.includes(module.id)}
                  currentLesson={currentLesson}
                  onToggle={() => toggleModule(module.id)}
                  onSelectLesson={(id) => setCurrentLesson(id)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </Sidebar>
      <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-slate-950">
        <div className="bg-black aspect-video w-full flex items-center justify-center shrink-0 overflow-hidden relative">
          {videoSrc ? (
            <video
              key={videoSrc}
              controls
              className="w-full h-full object-contain" // 🔥 object-contain é o segredo
            >
              <source src={videoSrc} type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          ) : (
            <Play size={48} className="text-slate-700" />
          )}
        </div>
        {/* info */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {currentLessonData?.title}
              </h2>
              <p className="text-sm text-slate-400">
                {currentLessonData?.moduleName} •{" "}
                {currentLessonData?.duration &&
                  formatDuration(currentLessonData.duration)}
              </p>
            </div>
            {currentLesson != 0 && !currentLessonData?.done && (
              <PrimaryActionButton
                onClick={() => markLessonAsDone(currentLesson)}
              >
                <CheckCircle2 size={16} />
                Marcar como concluído
              </PrimaryActionButton>
            )}
          </div>
        </div>

        {/* espaço livre abaixo do vídeo */}
        <div className="flex-1 flex items-center justify-center text-slate-500">
          Conteúdo adicional
        </div>
      </div>
      {/* ANOTAÇÕES */}
      <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2 text-slate-400">
          <FileText size={18} />
          <span className="text-sm font-medium">Anotações</span>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <MainTextarea
            placeholder="Escreva suas anotações..."
            className="h-full"
          />
        </div>
      </aside>
    </div>
  );
}

export default CourseLayout;
