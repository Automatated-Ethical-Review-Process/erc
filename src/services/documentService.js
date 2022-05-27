import db from "../db.json";

const { versions, documents } = db;

export function getDocuments(versionId) {
   versionId = Number(versionId);
   const version = versions.find((i) => i.id === versionId);

   if (version) {
      return documents.filter((d) => version.documents.includes(d.id));
   }
}

export function getDocument(id) {
   id = Number(id);
   return documents.find((i) => i.id === id);
}
