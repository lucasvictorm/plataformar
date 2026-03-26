import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function CardsGrid({ children }: Props) {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,260px)] gap-4 justify-center">
      {children}
    </div>
  );
}

export default CardsGrid;
