import db from "db";

const { notifications } = db;

export function getNotifications() {
   return notifications;
}

export function getNotification(id) {
   id = Number(id);
   return notifications.find((i) => i.id === id);
}
