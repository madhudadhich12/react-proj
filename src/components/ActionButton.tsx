import { ReactNode } from "react";

type ButtonVariant = "primary" | "danger";

type ActionButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};

export default function ActionButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ActionButtonProps) {
  const base =
    "inline-flex items-center justify-center " +
    "px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-[15px] font-medium tracking-tight " +
    "rounded-2xl select-none transition-all duration-200 " +
    "shadow-sm hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 " +
    "focus:outline-none focus:ring-2 focus:ring-rose-200";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  const disabledStyle =
    "opacity-50 grayscale cursor-not-allowed pointer-events-none";

  const styles = [
    base,
    variants[variant],
    disabled && disabledStyle,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
