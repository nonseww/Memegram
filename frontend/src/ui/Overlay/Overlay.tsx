import { Box } from "@mui/system";
import type { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
  isActive?: boolean;
  borderRadius?: number | string;
}

export const Overlay = ({
  children,
  isActive = false,
  borderRadius = 0,
}: OverlayProps) => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      bgcolor: "rgba(0, 0, 0, 0.5)",
      borderRadius: borderRadius,
      zIndex: 2,
      transition: "opacity 0.3s ease-in-out",
      opacity: isActive ? 1 : 0,
      ".MuiBox-root:hover > &": {
        opacity: 1,
      },
    }}
  >
    {children}
  </Box>
);
