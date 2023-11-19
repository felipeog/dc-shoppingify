import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

const schemes = {
  primary: "bg-orange-400",
  secondary: "bg-blue-300",
  danger: "bg-red-500",
};

type TButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  scheme?: keyof typeof schemes;
  isLoading?: boolean;
};

export function Button({
  children,
  scheme = "primary",
  isLoading = false,
  ...props
}: TButtonProps) {
  return (
    <button
      className={clsx(
        "min-h-[60px] disabled:cursor-not-allowed rounded-lg px-4 text-white",
        schemes[scheme],
        { "cursor-progress": isLoading }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
