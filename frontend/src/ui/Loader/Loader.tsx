import PageLoader from "./assets/pageLoader.svg";
import Box from "@mui/material/Box";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={PageLoader}
        alt="Loading..."
        sx={{
          width: 80,
          height: 80,
        }}
        color="secondary"
      />
    </Box>
  );
};
