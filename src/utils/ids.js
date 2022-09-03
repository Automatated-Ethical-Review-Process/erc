import { isUuid } from "./yup";

export function putIdName(id, name, setIds) {
  setIds((ids) => (ids[id] !== name ? { ...ids, [id]: name } : ids));
}

export function getIdName(ids, id) {
  const cache = ids[id];
  if (cache) {
    return cache;
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
