import { Bars } from "react-loader-spinner";
import { Box } from "@mui/material";

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
         <Bars color="grey" height={100} width={100} />
      </Box>
   ) : (
      children
   );
};

export default Loading;
