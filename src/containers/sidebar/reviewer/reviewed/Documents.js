import { useNavigate, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";

import BaseDocuments from "components/proposals/Documents";

export default function Documents() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <BaseDocuments>
      <Button
        variant="contained"
        onClick={() => navigate(`${pathname}/evaluation`)}
      >
        View Evaluation
      </Button>
    </BaseDocuments>
  );
}
