import { useWindowSize } from "../../hooks/useWindowSize";
import { DesktopSidebar, MobileHeader } from "../../components/Navigation";
import classes from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export const MainLayout = () => {
  const width = useWindowSize();
  const isMobile = width < 992;

  return (
    <main>
      <Header />
      <div className={classes.layout}>
        {isMobile ? <MobileHeader /> : <DesktopSidebar />}

        <div className={classes.mainContent}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

// либо preloader! / ref ждать рендер
// mixin в дисплей
