import LogoImage from "./assets/logo_image.svg";
import Memegram from "./assets/Memegram.svg";
import Menu from "./assets/Menu.svg";
import classes from "./Header.module.scss";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Header = () => {
  const width = useWindowSize();
  const isMobile = width < 992;

  return (
    <header className={classes.headerContainer}>
      <nav className={classes.nav}>
        <a className={classes.logoContainer}>
          <img src={LogoImage} alt="лого" className={classes.logoImage} />
          <img src={Memegram} alt="Memegram" className={classes.logoName} />
        </a>
        {isMobile && (
          <button className={classes.menuButton}>
            <img src={Menu} alt="Menu" className={classes.menuImage} />
          </button>
        )}
      </nav>
    </header>
  );
};
