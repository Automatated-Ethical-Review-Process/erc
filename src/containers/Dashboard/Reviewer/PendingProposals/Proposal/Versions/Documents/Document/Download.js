import { useParams } from "react-router-dom";

import { getDocument } from "services/documentService";

export default function Download() {
   const { pid: proposalId, vid: versionId, did: documentId } = useParams();

   const document = getDocument(proposalId, versionId, documentId);

   if (!document) {
      return "invalid link";
   }

   return (
      <>
         {"downloading... " + document.title}
         <br />
         {"fake :)"}
      </>
   );
}
