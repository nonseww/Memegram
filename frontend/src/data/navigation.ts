import CoffeeIcon from "/src/assets/svgs/Coffee.svg";
import LogoutIcon from "/src/assets/svgs/Logout.svg";
import SubscriptionsIcon from "/src/assets/svgs/Subscriptions.svg";
import UserIcon from "/src/assets/svgs/User.svg";
import type { Icon } from "../types/icon";

export const NAV_ELEMENTS: Icon[] = [
  {
    id: "Профиль",
    src: UserIcon,
    label: "Профиль",
    alt: "Профиль",
    href: "/profile",
  },
  {
    id: "Подписки",
    src: SubscriptionsIcon,
    label: "Подписки",
    alt: "Подписки",
    href: "/subscriptions",
  },
  {
    id: "Запостить",
    src: CoffeeIcon,
    label: "Запостить",
    alt: "Запостить",
    href: "/new-post",
  },
  {
    id: "Выйти",
    src: LogoutIcon,
    label: "Выйти",
    alt: "Выйти",
    href: "/login",
  },
];
