import { Route } from "react-router-dom";

import Document from "components/proposals/Document";
import Preview from "components/proposals/Preview";
import Download from "components/proposals/Download";
import OtherDocuments from "components/proposals/OtherDocuments";

const basicRoutes = (
  <>
    <Route index element={<Document />} />

    <Route path="preview" element={<Preview />} />

    <Route path="download" element={<Download />} />
  </>
);

export const documentRoute = <Route path="doc-:did">{basicRoutes}</Route>;

const docRoute = <Route path="doc-:doc">{basicRoutes}</Route>;

export const otherDocumentRoute = (
  <>
    {docRoute}

    <Route path=":type">
      <Route index element={<OtherDocuments />} />

      {docRoute}
    </Route>
  </>
);
