import Button from "../Button";
import CardBackground from "../CardBackground";
import { LuFolderUp } from "react-icons/lu";

function CardUpFolder() {
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
        <Button
          title="Importar Pasta"
          onClick={() => {
            console.log("Importar Pasta");
          }}
        />
      </div>
    </CardBackground>
  );
}

export default CardUpFolder;
