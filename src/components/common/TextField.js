import BaseTextField from "@mui/material/TextField";

export default function TextField({
  label,
  value,
  readOnly = false,
  sx,
  ...props
}) {
  return (
    <BaseTextField
      fullWidth
      size="small"
      label={label}
      value={value}
      InputProps={{
        readOnly: readOnly,
      }}
      {...props}
      sx={sx}
    />
  );
}
