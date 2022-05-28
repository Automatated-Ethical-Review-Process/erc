import TextField from "@mui/material/TextField";

export default function ReadOnlyTextField({ label, value }) {
   return (
      <TextField
         sx={{
            width: "100%",
         }}
         id="outlined-read-only-input"
         size="small"
         label={label}
         value={value}
         InputProps={{
            readOnly: true,
         }}
      />
   );
}
