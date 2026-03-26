import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function MainContent({ children }: Props) {
  return (
    <div className="flex-1 bg-background-secondary">
      <div className="h-full w-full flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default MainContent;
