import CircularProgress from "@mui/material/CircularProgress";
import classes from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  text,
  onClick,
  className,
  type,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={classNames(className, classes.button)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : text}
    </button>
  );
};
