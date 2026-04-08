import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

function ActionButton({ children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="h-full transition-all duration-200 w-14 hover:bg-gray-800 flex justify-center items-center"
    >
      {children}
    </div>
  );
}

export default ActionButton;
