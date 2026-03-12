import LogoutIcon from "./assets/Logout.svg";

interface LogoutProps {
  className: string;
}

export const Logout = ({ className }: LogoutProps) => {
  return <img src={LogoutIcon} alt="Logout" className={className} />;
};
