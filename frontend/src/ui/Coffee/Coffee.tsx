import CoffeeIcon from "./assets/Coffee.svg";

interface CoffeeProps {
  className: string;
}

export const Coffee = ({ className }: CoffeeProps) => {
  return <img src={CoffeeIcon} alt="Coffee" className={className} />;
};
