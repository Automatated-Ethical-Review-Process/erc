import { Container } from "@mui/material";
import Link from "@mui/material/Link";

import TextField from "components/common/TextField";

export default function Review() {
   return (
      <Container>
         <TextField
            sx={{ ml: 3 }}
            label="Reviewer"
            value="reviewer 1"
            readOnly
         />
         <br />
         <TextField
            sx={{ ml: 3, mt: 3 }}
            label="Decision"
            value="approved"
            readOnly
         />
         <br />
         <br />
         <Link href="#" underline="hover" color="warning.main">
            {"Download the Evaluation Form"}
         </Link>
      </Container>
   );
}
