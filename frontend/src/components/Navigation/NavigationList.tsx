import { ListItems } from "@/ui/ListItems";
import { NAV_ELEMENTS } from "@/data/navigation";

export const NavigationList = ({
  onItemClick,
}: {
  onItemClick?: () => void;
}) => <ListItems itemsList={NAV_ELEMENTS} onClick={onItemClick} />;
