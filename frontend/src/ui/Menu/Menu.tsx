import MenuIcon from "./assets/Menu.svg";
import classnames from "classnames";
import classes from "./Menu.module.scss";

interface MenuProps {
  className: string;
}

export const Menu = ({ className }: MenuProps) => {
  return (
    <button className={classes.menuButton}>
      <img
        src={MenuIcon}
        alt="Menu"
        className={classnames(className, classes.menuImage)}
      />
    </button>
  );
};
