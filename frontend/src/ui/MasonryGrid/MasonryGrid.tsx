import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: { xs: number; sm: number; md: number; lg: number };
  spacing?: { xs: number; sm: number; md: number; lg: number };
}

export const MasonryGrid = ({
  children,
  columns = { xs: 2, sm: 2, md: 3, lg: 5 },
  spacing = { xs: 1.5, sm: 1.5, md: 2, lg: 3 },
}: MasonryGridProps) => {
  return (
    <Box sx={{ width: "100%", p: 1, mt: 3 }}>
      <Masonry columns={columns} spacing={spacing}>
        {children}
      </Masonry>
    </Box>
  );
};
