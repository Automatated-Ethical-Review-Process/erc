import BaseTextField from "@mui/material/TextField";

export default function TextField({ label, value, readOnly = false }) {
   return (
      <BaseTextField
         fullWidth
         size="small"
         label={label}
         value={value}
         InputProps={{
            readOnly: readOnly,
         }}
      />
   );
}
