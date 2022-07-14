import { string } from "yup";

const isValid = (schema) => (value) => schema.isValidSync(value);

export const isEmail = isValid(string().email().required());
export const isUuid = isValid(string().uuid().required());
export const isUrl = isValid(string().url().required());
