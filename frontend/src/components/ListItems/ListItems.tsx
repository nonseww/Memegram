import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import v from "/src/styles/_variables.module.scss";
import { Icon } from "../../ui";
import type { icon } from "../../types/icon";

interface ListItemsProps {
  itemsList: icon[];
  onClick?: () => void;
}

export const ListItems = ({ itemsList, onClick }: ListItemsProps) => (
  <List>
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
