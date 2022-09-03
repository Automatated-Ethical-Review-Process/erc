import { Box } from "@mui/material";
import { Dna } from "react-loader-spinner";

const Loading = ({ value, children }) => {
  return value ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Dna height={100} width={100} />
    </Box>
  ) : (
    children
  );
};

export default Loading;
