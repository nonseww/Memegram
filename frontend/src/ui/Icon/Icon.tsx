import type { icon } from "../../types/icon";
import classes from "./Icon.module.scss";
import classNames from "classnames";

export const Icon = ({ src, alt, className, style }: icon) => (
  <img
    src={src}
    alt={alt}
    className={classNames(className, classes.icon)}
    style={style}
  />
);
