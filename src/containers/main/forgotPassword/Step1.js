import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Step1() {
   return (
      <>
         <Typography variant="body1" gutterBottom>
            Just enter your email address, and we will send you a link to reset
            your password.
         </Typography>
         <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
         />
      </>
   );
}
