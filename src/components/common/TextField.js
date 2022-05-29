import { TextField as BaseTextField } from "@mui/material/TextField";

export default function TextField({ label, value, readOnly = false }) {
   return (
      <BaseTextField
         sx={{
            width: "100%",
         }}
         size="small"
         label={label}
         value={value}
         InputProps={{
            readOnly: readOnly,
         }}
      />
   );
}
