import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

function MainButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className="text-3xl cursor-pointer">
      <div className="py-2 px-3 hover:bg-slate-700 transition duration-200 rounded-lg">
        <div className="flex gap-2 items-center">{children}</div>
      </div>
    </button>
  );
}

export default MainButton;
