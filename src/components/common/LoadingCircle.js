import { Backdrop, CircularProgress } from "@mui/material";

function LoadingCircle({ isLoading = false }) {
   return (
      <Backdrop
         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isLoading}
      >
         <CircularProgress color="primary" />
      </Backdrop>
   );
}

export default LoadingCircle;
