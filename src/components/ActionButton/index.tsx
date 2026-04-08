import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

function ActionButton({ children, onClick, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={`h-full transition-all duration-200 w-14 hover:bg-gray-800 flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
}

export default ActionButton;
