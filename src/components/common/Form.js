import { Box } from "@mui/material";

function Form({ onSubmit, children }) {
   return (
      <Box component="form" onSubmit={onSubmit} noValidate>
         {children}
      </Box>
   );
}

export default Form;
