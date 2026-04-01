import { MoreVertical, BookOpen, Clock } from "lucide-react";
import Default from "../../assets/default_course.png";
import ProgressBar from "../../ui/ProgressBar";
import Button from "../Button";
import { formatDuration, getPorcCompleted } from "../../utils/course";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  duration: number;
  completedLessons: number;
  totalLessons: number;
  onDelete: () => void;
};

const CourseCard = ({
  id,
  title,
  duration,
  completedLessons,
  totalLessons,
  onDelete,
}: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  let porcCompleted = getPorcCompleted(completedLessons, totalLessons);
  let formatedDuration = formatDuration(duration);
  const navigate = useNavigate();

  async function handleDelete() {
    const confirm = window.confirm("Deseja excluir este curso?");

    if (!confirm) return;

    await window.db.deleteCourse(id);

    onDelete();
  }

  return (
    <div className="w-65 bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all group rounded-2xl shadow-sm overflow-hidden">
      {/* Imagem */}
      <div className="relative h-36 bg-black">
        <img
          src={Default}
          alt="Thumbnail do curso"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Botão menu */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 rounded-full"
        >
          <MoreVertical size={16} className="text-gray-700" />
        </button>

        {/* Dropdown */}
        {openMenu && (
          <div className="absolute top-10 right-2 bg-slate-900 border border-slate-700 rounded-md shadow-lg z-10">
            <button
              onClick={handleDelete}
              className="block px-4 py-2 text-sm text-red-400 hover:bg-slate-800 w-full text-left"
            >
              Excluir curso
            </button>
          </div>
        )}

        <h2 className="absolute bottom-3 left-3 right-3 text-white text-md font-semibold leading-tight">
          {title}
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Progresso</span>
          <span className="text-gray-500 font-semibold">{porcCompleted}%</span>
        </div>

        <ProgressBar size={porcCompleted} className="bg-indigo-400" />

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

        <Button title="Continuar" onClick={() => navigate(`/course/${id}`)} />
      </div>
    </div>
  );
};

export default CourseCard;
