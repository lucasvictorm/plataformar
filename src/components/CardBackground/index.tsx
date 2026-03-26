import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function CardBackground({ children, className }: Props) {
  return (
    <div
      className={`bg-slate-800 border rounded-md border-slate-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default CardBackground;
