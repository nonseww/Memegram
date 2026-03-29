import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import v from "/src/styles/_variables.module.scss";
import { Icon } from "../../ui";
import type { icon } from "../../types/icon";
import type { ResponsiveStyleValue } from "@mui/system";

interface ListItemsProps {
  itemsList: icon[];
  onClick?: () => void;
  direction?: ResponsiveStyleValue<"row" | "column">;
}

export const ListItems = ({
  itemsList,
  onClick,
  direction,
}: ListItemsProps) => (
  <List
    sx={{
      display: "flex",
      flexDirection: direction || "column",
      gap: direction === "row" ? 2 : 1,
    }}
  >
    {itemsList.map(({ id, src, alt, href, label }) => (
      <ListItem key={alt} disablePadding>
        <ListItemButton
          component="a"
          href={href}
          onClick={onClick}
          sx={{ borderRadius: "10px", mb: 1 }}
        >
          <ListItemIcon>
            <Icon id={id} src={src} alt={alt} style={{ color: v.mainPurple }} />
          </ListItemIcon>
          <ListItemText primary={label} sx={{ color: v.textColor }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);
