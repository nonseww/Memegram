import LogoImage from "./assets/logo_image.svg";
import Memegram from "./assets/Memegram.svg";
import classes from "./Header.module.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Menu } from "../../ui/Menu";

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
        {isMobile && <Menu className={classes.menu} />}
      </nav>
    </header>
  );
};
