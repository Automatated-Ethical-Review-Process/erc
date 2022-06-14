import { Route } from "react-router-dom";

import Document from "components/proposals/Document";
import Preview from "components/proposals/Preview";
import Download from "components/proposals/Download";

const DocumentRoute = () => {
   return (
      <Route path="doc-:did">
         <Route index element={<Document />} />
         <Route path="preview" element={<Preview />} />
         <Route path="download" element={<Download />} />
      </Route>
   );
};

export default DocumentRoute;
