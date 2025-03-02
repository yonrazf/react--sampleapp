import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 m-2 bg-slate-500 text-white rounded-md shadow-md hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
