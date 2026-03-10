import classes from "./Navigation.module.scss";
import Coffee from "./assets/Coffee.svg";
import Logout from "./assets/Logout.svg";
import Subscriptions from "./assets/Subscriptions.svg";
import User from "./assets/User.svg";

// массив
// section

export const DesktopSidebar = () => {
  return (
    <section className={classes.asideContainer}>
      <nav>
        <ul className={classes.ulList}>
          <li>
            <a>
              <img src={User} className={classes.icon} />
              <span>Профиль</span>
            </a>
          </li>
          <li>
            <a>
              <img src={Subscriptions} className={classes.icon} />
              <span>Подписки</span>
            </a>
          </li>
          <li>
            <a>
              <img src={Coffee} className={classes.icon} />
              <span>Запостить</span>
            </a>
          </li>
          <li>
            <a>
              <img src={Logout} className={classes.icon} />
              <span>Выйти</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
