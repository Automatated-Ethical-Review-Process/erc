import db from "../db.json";

const { proposals, versions } = db;

export function getVersions(proposalId) {
   proposalId = Number(proposalId);
   const proposal = proposals.find((i) => i.id === proposalId);

   if (proposal) {
      return versions.filter((v) => proposal.versions.includes(v.id));
   }
}

export function getVersion(id) {
   id = Number(id);
   return versions.find((i) => i.id === id);
}
