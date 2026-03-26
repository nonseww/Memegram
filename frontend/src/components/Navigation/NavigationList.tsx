import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NAV_ELEMENTS } from "../../data/navigation";
import v from "/src/styles/_variables.module.scss";

export const NavigationList = ({
  onItemClick,
}: {
  onItemClick?: () => void;
}) => (
  <List>
    {NAV_ELEMENTS.map(({ Icon, label, href }) => (
      <ListItem key={label} disablePadding>
        <ListItemButton
          component="a"
          href={href}
          onClick={onItemClick}
          sx={{ borderRadius: "10px", mb: 1 }}
        >
          <ListItemIcon>
            <Icon style={{ color: v.mainPurple }} />
          </ListItemIcon>
          <ListItemText primary={label} sx={{ color: v.textColor }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);
