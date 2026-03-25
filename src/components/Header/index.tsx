import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineClose,
  MdOutlineMinimize,
  MdOutlineSquare,
} from "react-icons/md";
import ActionButton from "../ActionButton";
import { FiMinus } from "react-icons/fi";

function Header() {
  return (
    <div className="bg-background-main border-b border-b-slate-800 flex justify-between relative h-14">
      <div className="text-gray-400 flex gap-2 items-center pl-4">
        <IoSettingsOutline />
        <IoHomeOutline />
      </div>
      <h1 className="text-text-main absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        Plataformar
      </h1>
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
