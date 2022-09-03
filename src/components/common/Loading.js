import { Dna } from "react-loader-spinner";
import { Box } from "@mui/material";
import { useTheme } from "styled-components";

const Loading = ({ value, children }) => {
  const { palette } = useTheme();

  return value ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Dna color={palette.primary.main} height={100} width={100} />
    </Box>
  ) : (
    children
  );
};

export default Loading;
