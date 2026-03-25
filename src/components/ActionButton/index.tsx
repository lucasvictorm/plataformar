import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ActionButton({ children }: Props) {
  return (
    <div className="h-full transition-all duration-200 w-14 hover:bg-gray-800 flex justify-center items-center">
      {children}
    </div>
  );
}

export default ActionButton;
