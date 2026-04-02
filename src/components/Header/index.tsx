import { MdOutlineClose, MdOutlineSquare } from "react-icons/md";
import ActionButton from "../ActionButton";
import { FiMinus } from "react-icons/fi";
import MainButton from "../MainButton";

import PlataformarLogo from "../../assets/plataformar.svg";
import { House, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-main border-b border-b-slate-700 flex justify-between relative h-14">
      <div className="flex gap-3">
        <div className="pl-5">
          <div className="flex h-full justify-center items-center">
            <img
              src={PlataformarLogo}
              alt="Logo Plataformar"
              className="w-12 h-auto"
            />
            <h1 className="text-text-main text-center text-lg font-bold">
              Plataformar
            </h1>
          </div>
        </div>
        <div className="text-gray-400 flex gap-2 items-center pl-6">
          <MainButton onClick={() => navigate("/")}>
            <House size={20} />
            <p className="text-base">Início</p>
          </MainButton>
          <MainButton onClick={() => console.log("Config")}>
            <Settings size={20} />
            <p className="text-base">Configurações</p>
          </MainButton>
        </div>
      </div>

      <div className="text-text-main flex items-center">
        <ActionButton>
          <FiMinus />
        </ActionButton>
        <ActionButton>
          <MdOutlineSquare />
        </ActionButton>
        <ActionButton>
          <MdOutlineClose />
        </ActionButton>
      </div>
    </div>
  );
}

export default Header;
