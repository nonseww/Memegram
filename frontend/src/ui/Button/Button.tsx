import classes from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type: "button" | "reset" | "submit" | undefined;
}

export const Button = ({ text, onClick, className, type }: ButtonProps) => {
  return (
    <button
      className={classNames(className, classes.button)}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
