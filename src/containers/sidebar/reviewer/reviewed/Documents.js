import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import BaseDocuments from "components/proposals/Documents";

export default function Documents() {
  const navigate = useNavigate();

  return (
    <BaseDocuments>
      <Button variant="contained" onClick={() => navigate("evaluation")}>
        View Evaluation
      </Button>
    </BaseDocuments>
  );
}
