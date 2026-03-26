import { User, Subscriptions, Coffee, Logout } from "../ui";

interface NavElement {
  Icon: React.ElementType;
  label: string;
  href: string;
}

export const NAV_ELEMENTS: NavElement[] = [
  { Icon: User, label: "Профиль", href: "/profile" },
  { Icon: Subscriptions, label: "Подписки", href: "/subscriptions" },
  { Icon: Coffee, label: "Запостить", href: "/post" },
  { Icon: Logout, label: "Выйти", href: "/logout" },
];
