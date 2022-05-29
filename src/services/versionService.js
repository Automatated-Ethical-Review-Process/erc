import db from "db";
import { getProposal } from "./proposalService";

const { versions } = db;

export function getVersions(proposalId) {
   const proposal = getProposal(proposalId);

   if (proposal) {
      return versions.filter((v) => proposal.versions.includes(v.id));
   }
}

export function getVersion(proposalId, id) {
   const proposal = getProposal(proposalId);

   id = Number(id);
   if (proposal && proposal.versions.includes(id)) {
      return versions.find((i) => i.id === id);
   }
}
