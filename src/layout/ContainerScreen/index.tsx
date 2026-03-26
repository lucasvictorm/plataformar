import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ContainerScreen({ children }: Props) {
  return <div className="w-screen min-h-screen flex flex-col">{children}</div>;
}

export default ContainerScreen;
