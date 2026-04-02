import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

function PrimaryActionButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer
        flex items-center gap-2
        px-4 py-2 rounded-lg
        text-sm font-medium
        bg-blue-600 hover:bg-blue-700
        text-white
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default PrimaryActionButton;
