import Button from "@mui/material/Button";
import { useGetVersionQuery } from "api/data/version";

import BaseDocuments from "components/proposals/Documents";
import { useNavigate, useParams } from "react-router-dom";

export default function DocumentsWithDecision() {
  const navigate = useNavigate();
  const { pid, vid } = useParams();

  const { data = {} } = useGetVersionQuery({ pid, vid });

  return (
    <BaseDocuments>
      {data.comment && (
        <Button variant="contained" onClick={() => navigate("decision")}>
          View decision and comments
        </Button>
      )}
    </BaseDocuments>
  );
}
