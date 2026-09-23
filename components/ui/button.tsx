import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "rounded-full bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon",
        className,
      )}
      {...props}
    />
  );
}
