import db from "../db.json";

const users = db.users;

export function getUsers() {
   return users;
}

export function getUser(id) {
   id = Number(id);
   return users.find((i) => i.id === id);
}
