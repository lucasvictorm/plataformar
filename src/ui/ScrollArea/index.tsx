import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function ScrollArea({ children, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="h-full w-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {children}
      </div>
    </div>
  );
}

export default ScrollArea;
