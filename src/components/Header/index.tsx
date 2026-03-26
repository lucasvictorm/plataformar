import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineClose, MdOutlineSquare } from "react-icons/md";
import ActionButton from "../ActionButton";
import { FiMinus } from "react-icons/fi";
import MainButton from "../MainButton";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import PlataformarLogo from "../../assets/plataformar.svg";

function Header() {
  return (
    <div className="bg-background-main border-b border-b-slate-700 flex justify-between relative h-14">
      <div className="text-gray-400 flex gap-6 items-center pl-6">
        <MainButton
          onClick={() => console.log("Home")}
          fillIcon={<AiFillHome />}
        >
          <AiOutlineHome />
        </MainButton>
        <MainButton
          onClick={() => console.log("Config")}
          fillIcon={<IoSettings />}
        >
          <IoSettingsOutline />
        </MainButton>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="flex justify-center items-center">
          <img
            src={PlataformarLogo}
            alt="Logo Plataformar"
            className="w-14 h-auto"
          />
          <h1 className="text-text-main text-center text-lg font-bold">
            Plataformar
          </h1>
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
