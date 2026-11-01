import type { PropsWithChildren, ReactNode } from "react";

interface EndingCardProps extends PropsWithChildren {
  title: string;
  footer?: ReactNode;
}
const EndingCard = ({ title, children, footer }: EndingCardProps) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg mt-0">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="mb-4">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default EndingCard;
