import db from "db";
import { getVersion } from "./versionService";

const { documents } = db;

export function getDocuments(proposalId, versionId) {
   const version = getVersion(proposalId, versionId);

   if (version) {
      return documents.filter((d) => version.documents.includes(d.id));
   }
}

export function getDocument(proposalId, versionId, id) {
   const version = getVersion(proposalId, versionId);

   id = Number(id);
   if (version && version.documents.includes(id)) {
      return documents.find((i) => i.id === id);
   }
}
