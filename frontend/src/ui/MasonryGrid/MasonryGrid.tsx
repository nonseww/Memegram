import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: { xs: number; sm: number; md: number; lg: number };
  spacing?: number;
}

export const MasonryGrid = ({
  children,
  columns = { xs: 2, sm: 3, md: 4, lg: 5 },
  spacing = 2,
}: MasonryGridProps) => {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Masonry columns={columns} spacing={spacing}>
        {children}
      </Masonry>
    </Box>
  );
};
