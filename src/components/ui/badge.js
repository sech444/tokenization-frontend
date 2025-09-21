import * as React from "react";
import { cn } from "../../lib/utils";

const variants = {
  default:
    "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  secondary:
    "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100",
  success:
    "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
  destructive:
    "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
