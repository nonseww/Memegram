import UserIcon from "./assets/User.svg";

interface UserProps {
  className: string;
}

export const User = ({ className }: UserProps) => {
  return <img src={UserIcon} alt="User" className={className} />;
};
