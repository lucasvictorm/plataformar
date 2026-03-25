import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ContainerScreen({ children }: Props) {
  return <div className="w-screen h-screen flex flex-col">{children}</div>;
}

export default ContainerScreen;
