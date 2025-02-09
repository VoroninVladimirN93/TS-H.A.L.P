import { JSX, ReactNode } from "react";

type Props = {
  text?: string;
  color: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
  children?: ReactNode | JSX.Element;
};

export default function Button({
  text,
  color,
  disabled,
  icon,
  onClick,
  type = "button",
  children,
}: Props): JSX.Element {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{ backgroundColor: `${color}` }}
      disabled={disabled}
    >
      {icon && <img src={icon} width={20} />}
      {text}
      {children}
    </button>
  );
}
