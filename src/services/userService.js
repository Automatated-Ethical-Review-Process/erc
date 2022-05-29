import db from "db";

const { users } = db;

export function getUsers() {
   return users;
}

export function getUser(id) {
   id = Number(id);
   return users.find((i) => i.id === id);
}
