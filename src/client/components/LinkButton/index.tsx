import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type TLinkButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  isLoading?: boolean;
};

export function LinkButton({
  children,
  isLoading = false,
  ...props
}: TLinkButtonProps) {
  return (
    <button
      className={clsx("min-h-[60px] disabled:cursor-not-allowed", {
        "cursor-progress": isLoading,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
