import { cn } from "@/lib/utils";
import { LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-400", className)}
      {...props}
    >
      {children}
    </label>
  );
};
