import classes from "./Navigation.module.scss";
import { User, Subscriptions, Coffee, Logout } from "../../ui";

interface NavElement {
  Icon: React.ElementType;
  label: string;
  href: string;
}

const navElements: NavElement[] = [
  { Icon: User, label: "Профиль", href: "/profile" },
  { Icon: Subscriptions, label: "Подписки", href: "/subscriptions" },
  { Icon: Coffee, label: "Запостить", href: "/post" },
  { Icon: Logout, label: "Выйти", href: "/logout" },
];

export const DesktopSidebar = () => {
  return (
    <section className={classes.asideContainer}>
      <nav>
        <ul className={classes.ulList}>
          {navElements.map(({ Icon, label, href }) => (
            <li key={label}>
              <a href={href}>
                <Icon className={classes.Icon} />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
