import SubscriptionsIcon from "./assets/Subscriptions.svg";

interface SubscriptionsProps {
  className: string;
}

export const Subscriptions = ({ className }: SubscriptionsProps) => {
  return (
    <img src={SubscriptionsIcon} alt="Subscriptions" className={className} />
  );
};
