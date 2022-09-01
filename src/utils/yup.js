import { object, string, number, boolean, mixed, ref } from "yup";

const isValid = (schema) => (value) => schema.isValidSync(value);

export const isEmail = isValid(string().email().required());
export const isUuid = isValid(string().uuid().required());
export const isUrl = isValid(string().url().required());

export const yEmail = string()
  .required("Email is required")
  .email("Invalid email")
  .default("");

export const yPassword = string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(40, "Password must not exceed 40 characters")
  .default("");

export const yMobileNumber = string()
  .required("Mobile number is required")
  .matches(/^\d{10}$/, "Invalid number")
  .default("");

export const yLandNumber = string()
  .matches(/^(\d{10})?$/, "Invalid number")
  .default("");

export const yAddress = string()
  .required("Address is required")
  .min(5, "Address must be at least 5 characters")
  .default("");

export const yEducationalQualifications = string()
  .required("Education qualifications are required")
  .default("");

export const yFile = mixed(
  (o) => o instanceof FileList && o.length === 1
).nullable();
export const yFiles = mixed(
  (o) => o instanceof FileList && o.length > 0
).nullable();

export const yNicPassport = string();

export const yEmptySchema = object();
export const yEmailSchema = object({ email: yEmail });
export const yPasswordSchema = object({ password: yPassword });

export {
  object as yObject,
  string as yString,
  number as yNumber,
  boolean as yBoolean,
  mixed as yMixed,
  ref as yRef,
};
