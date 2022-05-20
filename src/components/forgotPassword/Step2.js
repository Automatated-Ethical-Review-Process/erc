import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Step2() {
   return (
      <React.Fragment>
         <Typography variant="body1" gutterBottom>
            We’ve sent an email to test@email.com. Please check the email and
            follow the directions to reset the password.
         </Typography>
      </React.Fragment>
   );
}
