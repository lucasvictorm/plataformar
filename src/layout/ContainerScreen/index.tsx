import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ContainerScreen({ children }: Props) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">{children}</div>
  );
}

export default ContainerScreen;
