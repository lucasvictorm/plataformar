import {
  MdOutlineClose,
  MdOutlineFilterNone,
  MdOutlineSquare,
} from "react-icons/md";
import ActionButton from "../ActionButton";
import { FiMinus } from "react-icons/fi";
import MainButton from "../MainButton";

import PlataformarLogo from "../../assets/plataformar.svg";
import { ArrowLeft, BookOpen, House, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const courseName = location.state?.courseName;

  const isCoursePage = location.pathname.includes("/course");
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onMaximizeChange(setIsMaximized);

    return () => {
      unsubscribe();
    };
  }, []);
  {
    console.log(isMaximized + "asda");
  }
  return (
    <div className="bg-background-main border-b border-b-slate-700 flex justify-between relative h-14 drag">
      <div className="flex gap-3 items-center">
        {isCoursePage ? (
          // 🔥 MODO CURSO
          <div className="flex items-center no-drag ml-2 ">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
                 text-text-main hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={20} className="text-text-main" />
              <BookOpen size={20} className="text-text-main" />
              <span className="text-base font-semibold">
                {courseName || "Curso"}
              </span>
            </div>
          </div>
        ) : (
          // 🔥 HEADER NORMAL (INALTERADO)
          <>
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

            <div className="text-gray-400 flex gap-2 items-center pl-6 no-drag">
              {/*
              <MainButton onClick={() => navigate("/")}>
                <House size={20} />
                <p className="text-base">Início</p>
              </MainButton>*/}

              <MainButton onClick={() => console.log("Config")}>
                <Settings size={20} />
                <p className="text-base">Configurações</p>
              </MainButton>
            </div>
          </>
        )}
      </div>

      {/* 🔥 CONTROLES DA JANELA (inalterado) */}
      <div className="text-text-main flex items-center no-drag">
        <ActionButton onClick={window.electronAPI.minimize}>
          <FiMinus />
        </ActionButton>

        <ActionButton onClick={window.electronAPI.maximize}>
          {isMaximized ? <MdOutlineFilterNone /> : <MdOutlineSquare />}
        </ActionButton>

        <ActionButton onClick={window.electronAPI.close}>
          <MdOutlineClose />
        </ActionButton>
      </div>
    </div>
  );
}

export default Header;
