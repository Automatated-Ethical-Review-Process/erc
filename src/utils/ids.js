import { isUuid } from "./yup";

const ids = new Map();

export function putIdName(id, name) {
  ids.set(id, name); // TODO: set limit and remove old entries
}

export function getIdName(id) {
  if (ids.has(id)) {
    return ids.get(id);
  }
  const parts = id.split("-");
  if (
    isUuid(id) ||
    ((parts.length === 5 || parts.length === 6) && parts[0].length === 8)
  ) {
    return parts[0];
  }
  return id;
}
