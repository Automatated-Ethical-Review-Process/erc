import db from "db";

const { proposals } = db;

export function getProposal(id) {
  id = Number(id);
  return proposals.find((i) => i.id === id);
}
