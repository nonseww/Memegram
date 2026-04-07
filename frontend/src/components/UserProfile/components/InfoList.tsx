import { PROFILE_INFO_ITEMS } from "@/data/profileInfo";
import { ListItems } from "@/ui/ListItems";

interface InfoListProps {
  labels: Record<string, string>;
}

export const InfoList = ({ labels }: InfoListProps) => (
  <ListItems
    direction={{ xs: "column", md: "row" }}
    itemsList={PROFILE_INFO_ITEMS.map((item) => ({
      ...item,
      label: labels[item.id] || "",
    }))}
  />
);
