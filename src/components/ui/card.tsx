import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn(" shadow-lg rounded-lg p-4", className)}>{children}</div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  return <div className="pb-2 border-b">{children}</div>;
};

interface CardTitleProps {
  children: ReactNode;
}

export const CardTitle = ({ children }: CardTitleProps) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

interface CardContentProps {
  children: ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className="pt-2">{children}</div>;
};
