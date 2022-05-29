import { useParams } from "react-router-dom";

import PdfViewer from "components/PdfViewer";

import { getDocument } from "services/documentService";

export default function Preview() {
   const { pid: proposalId, vid: versionId, did: documentId } = useParams();

   const document = getDocument(proposalId, versionId, documentId);

   if (!document) {
      return "invalid link";
   }

   return <PdfViewer link={document.link} />;
}
