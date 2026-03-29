import Followings from "/src/assets/svgs/Star.svg";
import Followers from "/src/assets/svgs/Users.svg";
import Posts from "/src/assets/svgs/Coffee.svg";
import type { icon } from "../types/icon";

export const PROFILE_INFO_ITEMS: icon[] = [
  { id: "followers", src: Followers, alt: "followers" },
  { id: "followings", src: Followings, alt: "followings" },
  { id: "posts", src: Posts, alt: "posts" },
];
