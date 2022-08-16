import {
  InsertDriveFile,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useControl from "hooks/useControl";
import { useState } from "react";
import { Controller } from "react-hook-form";

export function TextFieldController({ name, defaultValue = "", ...rest }) {
  const control = useControl();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          margin="normal"
          size="medium"
          error={!!error}
          helperText={error && error.message}
          {...rest}
        />
      )}
    />
  );
}

export function PasswordFieldController(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextFieldController
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
      {...props}
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

export function SelectController({
  options,
  defaultValue = options[0].value,
  ...rest
}) {
  return (
    <TextFieldController select defaultValue={defaultValue} {...rest}>
      {options.map((option, key) => (
        <MenuItem key={key} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextFieldController>
  );
}

export function RadioGroupController({
  name,
  options,
  defaultValue = options[0].value,
  ...args
}) {
  return (
    <Controller
      name={name}
      control={useControl()}
      defaultValue={defaultValue}
      render={({ field }) => (
        <RadioGroup {...field}>
          {options.map((option, key) => (
            <FormControlLabel
              key={key}
              value={option.value}
              control={<Radio color="secondary" {...args} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}

export function CheckboxController({
  name,
  label,
  defaultValue = false,
  ...args
}) {
  return (
    <Controller
      name={name}
      control={useControl()}
      defaultValue={defaultValue}
      render={({ field: { value, ...rest } }) => (
        <FormControlLabel
          control={
            <Checkbox {...rest} checked={value} color="secondary" {...args} />
          }
          label={label}
        />
      )}
    />
  );
}

export function SwitchController({
  name,
  trueLabel,
  falseLabel,
  defaultValue = false,
  ...args
}) {
  return (
    <Controller
      name={name}
      control={useControl()}
      defaultValue={true}
      render={({ field: { value, ...rest } }) => (
        <FormControlLabel
          control={
            <Switch {...rest} checked={value} color="secondary" {...args} />
          }
          label={value ? trueLabel : falseLabel}
        />
      )}
    />
  );
}

const Input = styled("input")({
  display: "none",
});

function InputController({ name, label = "Upload", icon, ...args }) {
  return (
    <Controller
      name={name}
      control={useControl()}
      render={({
        field: { value, onChange, ...rest },
        fieldState: { error },
      }) => (
        <label htmlFor={name}>
          <Input
            {...rest}
            id={name}
            type="file"
            files={value}
            onChange={({ target: t }) =>
              onChange({
                target: { ...t, value: t.files },
              })
            }
            {...args}
          />
          <Button component="span" variant="outlined" startIcon={icon}>
            {label}
          </Button>
          <br />
          {value?.length > 0 && (
            <Typography
              sx={{ mt: 1 }}
              component="span"
              variant="body2"
              color="secondary"
            >
              {Array.from(value)
                .map((i) => i.name)
                .join(", ")}
            </Typography>
          )}
          {error && (
            <Typography
              sx={{ mt: 1 }}
              component="span"
              variant="body2"
              color="error"
            >
              {error.message}
            </Typography>
          )}
        </label>
      )}
    />
  );
}

export function FileInputController({ name, label, ...args }) {
  return (
    <InputController
      name={name}
      label={label}
      icon={<InsertDriveFile />}
      accept=".pdf"
      {...args}
    />
  );
}

export function ImageInputController({ name, label, ...args }) {
  return (
    <InputController
      name={name}
      label={label}
      icon={<PhotoCamera />}
      accept="image/*"
      {...args}
    />
  );
}
