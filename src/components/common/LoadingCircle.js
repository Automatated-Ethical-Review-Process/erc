import { Backdrop } from "@mui/material";
import { Dna } from "react-loader-spinner";

function LoadingCircle({ isLoading = false }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <Dna height={100} width={100} />
    </Backdrop>
  );
}

export default LoadingCircle;
