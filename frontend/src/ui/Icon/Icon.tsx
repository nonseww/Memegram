import type { icon } from "../../types/icon";

export const Icon = ({ src, alt, className, style }: icon) => (
  <img src={src} alt={alt} className={className} style={style} />
);
