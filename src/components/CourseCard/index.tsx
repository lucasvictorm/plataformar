import { MoreVertical, BookOpen, Clock } from "lucide-react";
import Default from "../../assets/default_course.png";
import ProgressBar from "../../ui/ProgressBar";
import Button from "../Button";

type Props = {
  title: string;
  duration: number;
  completedLessons: number;
  totalLessons: number;
};

function getPorcCompleted(completed: number, total: number): number {
  return (completed / total) * 100;
}

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}min`;
}

const CourseCard = ({
  title,
  duration,
  completedLessons,
  totalLessons,
}: Props) => {
  let porcCompleted = getPorcCompleted(completedLessons, totalLessons);
  let formatedDuration = formatDuration(duration);

  return (
    <div className="w-65 bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all group rounded-2xl shadow-sm overflow-hidden">
      {/* Imagem */}
      <div className="relative h-36 bg-black">
        <img
          src={Default}
          alt="Thumbnail do curso"
          className="w-full h-full object-cover opacity-80"
        />

        <button className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 rounded-full">
          <MoreVertical size={16} className="text-gray-700" />
        </button>

        <h2 className="absolute bottom-3 left-3 right-3 text-white text-md font-semibold leading-tight">
          {title}
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Progresso */}
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Progresso</span>
          <span className="text-gray-500 font-semibold">{porcCompleted}%</span>
        </div>

        <ProgressBar size={porcCompleted} className="bg-indigo-400" />

        {/* Rodapé */}
        <div className="flex justify-between text-gray-500 text-xs mb-2">
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>
              {completedLessons}/{totalLessons}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{formatedDuration}</span>
          </div>
        </div>
        <Button title="Continuar" onClick={() => {}} />
      </div>
    </div>
  );
};

export default CourseCard;
