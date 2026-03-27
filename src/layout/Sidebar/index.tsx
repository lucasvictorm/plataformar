import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Sidebar({ children }: Props) {
  return (
    <div className="w-1/4 bg-background-main border-r border-r-slate-700 flex-col flex">
      {children}
    </div>
  );
}

export default Sidebar;
