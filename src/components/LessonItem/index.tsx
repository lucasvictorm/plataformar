import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { Lesson } from "../../types/course";
import { formatDuration } from "../../utils/course";

type Props = {
  lesson: Lesson;
  isActive: boolean;
  onClick: () => void;
};

function LessonItem({ lesson, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left ${
        isActive
          ? "bg-blue-600/20 border border-blue-500/50"
          : "hover:bg-slate-800 border border-transparent"
      }`}
    >
      {lesson.done ? (
        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
      ) : (
        <Circle className="h-4 w-4 text-slate-600 flex-shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{lesson.title}</p>

        {lesson.duration && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {formatDuration(lesson.duration)}
          </div>
        )}
      </div>
    </button>
  );
}

export default LessonItem;
