import { useLocation, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import BaseDocuments from "components/proposals/Documents";

function Documents() {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   return (
      <BaseDocuments>
         <Button
            variant="contained"
            onClick={() => navigate(`${pathname}/reviews`)}
         >
            Show Reviews
         </Button>
         <Button
            sx={{ ml: 2 }}
            variant="contained"
            onClick={() => navigate(`${pathname}/comments`)}
         >
            View Comments
         </Button>
      </BaseDocuments>
   );
}

export default Documents;
