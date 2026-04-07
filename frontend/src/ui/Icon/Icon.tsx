import type { Icon as IconProps } from "../../types/icon";
import classes from "./Icon.module.scss";
import classNames from "classnames";

export const Icon = ({ src, alt, className, style, color }: IconProps) => (
  <span
    className={classNames(className, classes.icon)}
    style={{
      ...style,
      display: "inline-block",
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      backgroundColor: color,
    }}
    role="img"
    aria-label={alt}
  />
);
