import db from "db.json";

const proposals = db.proposals;

export function getProposals() {
   return proposals;
}

export function getProposal(id) {
   id = Number(id);
   return proposals.find((i) => i.id === id);
}
