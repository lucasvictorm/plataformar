import { useNavigate } from "react-router-dom";
import Button from "../Button";
import CardBackground from "../CardBackground";
import { LuFolderUp } from "react-icons/lu";

function CardUpFolder() {
  async function handleImport() {
    try {
      // 1. Abrir seletor de pasta
      const caminho = await window.fs.selectFolder();

      if (!caminho) return;

      // 2. Importar curso
      const res = await window.fs.importCourse(caminho);

      if (res.success) {
        alert("Curso importado com sucesso!");
        navigate("/home"); // agora sim faz sentido
      } else {
        alert("Erro ao importar: " + res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    }
  }

  const navigate = useNavigate();
  return (
    <CardBackground className="w-130 p-4 rounded-md ">
      <div className="flex flex-col text-white items-center gap-6">
        <div className="border text-6xl bg-slate-900 border-slate-700 p-2 rounded-md">
          <LuFolderUp />
        </div>
        <h2 className="text-2xl">Solte aqui para começar!</h2>
        <p className="text-center">
          Arraste ou importe sua primeira pasta para organizar seu aprendizado
        </p>
        <Button title="Importar Pasta" onClick={handleImport} />
      </div>
    </CardBackground>
  );
}

export default CardUpFolder;
