import Card from "@mui/material/Card";
import v from "@/styles/_variables.module.scss";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(() => ({
  width: "100%",
  backgroundColor: v.cardColor,
  borderRadius: "25px",
  border: `1px solid ${v.bgcolor}`,
  boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.3)",
  py: "10px",
  pb: "15px",
  //display: "flex",
  transition: "transform 0.2s",
  "&:hover": { transform: "translateY(-4px)" },
  willChange: "transform",
  overflow: "hidden",
}));
