import CoffeeIcon from "/src/assets/svgs/Coffee.svg";
import LogoutIcon from "/src/assets/svgs/Logout.svg";
import SubscriptionsIcon from "/src/assets/svgs/Subscriptions.svg";
import UserIcon from "/src/assets/svgs/User.svg";
import type { icon } from "../types/icon";

export const NAV_ELEMENTS: icon[] = [
  {
    id: "Профиль",
    src: CoffeeIcon,
    label: "Профиль",
    alt: "Профиль",
    href: "/profile",
  },
  {
    id: "Подписки",
    src: LogoutIcon,
    label: "Подписки",
    alt: "Подписки",
    href: "/subscriptions",
  },
  {
    id: "Запостить",
    src: SubscriptionsIcon,
    label: "Запостить",
    alt: "Запостить",
    href: "/post",
  },
  { id: "Выйти", src: UserIcon, label: "Выйти", alt: "Выйти", href: "/logout" },
];
