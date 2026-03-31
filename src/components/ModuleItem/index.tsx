import { ChevronDown, ChevronRight } from "lucide-react";
import LessonItem from "../LessonItem";
import type { Module } from "../../types/course";

type Props = {
  module: Module;
  isExpanded: boolean;
  currentLesson: number;
  onToggle: () => void;
  onSelectLesson: (id: number) => void;
};

function ModuleItem({
  module,
  isExpanded,
  currentLesson,
  onToggle,
  onSelectLesson,
}: Props) {
  const completed = module.lessons.filter((l) => l.done).length;
  const total = module.lessons.length;

  return (
    <div className="mb-2">
      {/* Header do módulo */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate">
              {module.name}
            </h3>
            <p className="text-xs text-slate-400">
              {completed}/{total} aulas
            </p>
          </div>
        </div>
      </button>

      {/* Aulas */}
      {isExpanded && (
        <div className="ml-2 mt-1 space-y-1">
          {module.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isActive={currentLesson === lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ModuleItem;
