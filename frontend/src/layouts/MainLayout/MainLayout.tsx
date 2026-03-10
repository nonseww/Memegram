import type { ReactNode } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { DesktopSidebar, MobileHeader } from "../../components/Navigation";
import classes from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const width = useWindowSize();
  const isMobile = width < 992;

  return (
    <main>
      <div className={classes.layout}>
        {isMobile ? <MobileHeader /> : <DesktopSidebar />}

        <div className={classes.mainContent}>{children}</div>
      </div>
    </main>
  );
};

// либо preloader! / ref ждать рендер
// mixin в дисплей
