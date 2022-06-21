import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";

export default function ViewEvaluation() {
   return (
      <Container>
         <FormControl>
            <Typography variant="h5">Decision</Typography>
            <Box ml={3}>
               <RadioGroup
                  defaultValue="approve"
                  name="radio-buttons-group"
                  ml="2"
               >
                  <FormControlLabel
                     value="approve"
                     control={<Radio />}
                     label="Approve"
                     selected
                  />
               </RadioGroup>
            </Box>
            <Link href="#" underline="hover" color="warning.main">
               {"Download the Evaluation Form"}
            </Link>
         </FormControl>
      </Container>
   );
}
