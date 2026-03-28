import { PROFILE_INFO_ITEMS } from "../../data/profileInfo";
import { ListItems } from "../ListItems";

interface InfoListProps {
  labels: Record<string, string>;
}

export const InfoList = ({ labels }: InfoListProps) => (
  <ListItems
    itemsList={PROFILE_INFO_ITEMS.map((item) => ({
      ...item,
      label: labels[item.id] || "",
    }))}
  />
);
