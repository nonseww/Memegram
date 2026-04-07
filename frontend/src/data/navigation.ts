import type { Icon } from "../types/icon";

export const NAV_ELEMENTS: Icon[] = [
  {
    id: "Профиль",
    src: "/src/assets/svgs/User.svg",
    label: "Профиль",
    alt: "Профиль",
    href: "/profile",
  },
  {
    id: "Подписки",
    src: "/src/assets/svgs/Subscriptions.svg",
    label: "Подписки",
    alt: "Подписки",
    href: "/subscriptions",
  },
  {
    id: "Запостить",
    src: "/src/assets/svgs/Coffee.svg",
    label: "Запостить",
    alt: "Запостить",
    href: "/new-post",
  },
  {
    id: "Выйти",
    src: "/src/assets/svgs/Logout.svg",
    label: "Выйти",
    alt: "Выйти",
    href: "/logout",
  },
];
