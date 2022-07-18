import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import {
   Button,
   Checkbox,
   FormControlLabel,
   IconButton,
   InputAdornment,
   TextField,
   Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Controller } from "react-hook-form";

export function TextFieldController({ name, control, ...rest }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState: { error } }) => (
            <TextField
               {...field}
               fullWidth
               variant="outlined"
               margin="normal"
               size="small"
               error={!!error}
               helperText={error && error.message}
               {...rest}
            />
         )}
      />
   );
}

export function PasswordFieldController({ label, ...rest }) {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <TextFieldController
         label={label}
         type={showPassword ? "text" : "password"}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton
                     onClick={() => setShowPassword((v) => !v)}
                     onMouseDown={(e) => e.preventDefault()}
                     edge="end"
                  >
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
               </InputAdornment>
            ),
         }}
         {...rest}
      />
   );
}

export function TextPasswordFieldController({ isPassword, ...rest }) {
   return isPassword ? (
      <PasswordFieldController {...rest} />
   ) : (
      <TextFieldController {...rest} />
   );
}

export function CheckboxController({ name, label, control, ...args }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { value, ...rest } }) => (
            <FormControlLabel
               control={
                  <Checkbox
                     {...rest}
                     checked={value}
                     color="secondary"
                     {...args}
                  />
               }
               label={label}
            />
         )}
      />
   );
}

const Input = styled("input")({
   display: "none",
});

export function FileInputController({ name, control, ...args }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
         }) => (
            <label htmlFor={name}>
               <Input
                  {...rest}
                  id={name}
                  accept="image/*"
                  type="file"
                  files={[value]}
                  onChange={({ target: t }) =>
                     onChange({
                        target: { ...t, value: t.files[0] },
                     })
                  }
                  {...args}
               />
               <Button component="span" startIcon={<PhotoCamera />}>
                  Upload
               </Button>
               {value && (
                  <Typography
                     component="span"
                     variant="body2"
                     color="secondary"
                  >
                     {value.name}
                  </Typography>
               )}
               {error && (
                  <Typography component="span" variant="body2" color="error">
                     {error.message}
                  </Typography>
               )}
            </label>
         )}
      />
   );
}
