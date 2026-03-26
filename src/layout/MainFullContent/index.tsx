import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function MainFullContent({ children }: Props) {
  return (
    <div className="flex-1 bg-background-secondary flex">
      <div className="w-full flex justify-center items-center">{children}</div>
    </div>
  );
}

export default MainFullContent;
