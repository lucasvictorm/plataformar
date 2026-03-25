import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  fillIcon: ReactNode;
};

function MainButton({ children, onClick, fillIcon }: Props) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="text-3xl cursor-pointer relative"
    >
      <div className="p-2 relative w-6 h-6">
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          {fillIcon}
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
        </div>
      </div>
    </button>
  );
}

export default MainButton;
