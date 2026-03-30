import Followings from "/src/assets/svgs/Star.svg";
import Followers from "/src/assets/svgs/Users.svg";
import Posts from "/src/assets/svgs/Coffee.svg";
import type { Icon } from "../types/icon";

export const PROFILE_INFO_ITEMS: Icon[] = [
  { id: "followers", href: "/followers", src: Followers, alt: "followers" },
  { id: "followings", href: "/followings", src: Followings, alt: "followings" },
  { id: "posts", src: Posts, href: "/posts", alt: "posts" },
];
