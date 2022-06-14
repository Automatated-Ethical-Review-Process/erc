import Typography from "@mui/material/Typography";

const Loading = ({ value, children }) => {
   return value ? (
      <Typography variant="h6" color="initial" textAlign="center" mt={5}>
         Loading Data ...
      </Typography>
   ) : (
      children
   );
};

export default Loading;
