import { BookOpen } from "lucide-react";
import ProgressBar from "../../ui/ProgressBar";

interface Props {
  title: string;
  totalLessons: number;
  completedLessons: number;
}

function getPorcCompleted(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}

export function CoursePill({ title, totalLessons, completedLessons }: Props) {
  const progress = getPorcCompleted(completedLessons, totalLessons);

  return (
    <div className="relative flex items-center gap-3 bg-background-main rounded-lg px-3 py-2 border border-slate-700 hover:bg-slate-700/40 hover:shadow-sm transition-all cursor-pointer">
      {/* Barra lateral */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4/5 w-1 rounded-r-full bg-indigo-500" />

      <div className="flex-1 min-w-0 space-y-1 pl-2">
        <div className="flex items-center justify-between gap-1">
          <h4 className="font-medium text-xs text-slate-100 truncate">
            {title}
          </h4>
          <span className="text-[10px] text-gray-400 font-medium">
            {progress}%
          </span>
        </div>

        <ProgressBar size={progress} className="bg-indigo-400" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground text-white">
          {" "}
          <BookOpen className="h-3.5 w-3.5" />{" "}
          <span>
            {" "}
            {completedLessons}/{totalLessons} aulas{" "}
          </span>{" "}
        </div>
      </div>
    </div>
  );
}

export default CoursePill;
