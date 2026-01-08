import { ReactNode } from "react";

type ButtonVariant = "primary" | "danger" | "secondary";

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
    "rounded-xl border transition-all duration-200 select-none " +
    "shadow-sm   active:translate-y-px " +
    "focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants: Record<ButtonVariant, string> = {
    primary: "border-transparent bg-blue-600 text-white  focus:ring-blue-500",
    danger: "border-transparent bg-red-600 text-white  focus:ring-red-500",
    secondary: "border-gray-300 bg-white text-gray-700  focus:ring-gray-500",
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
