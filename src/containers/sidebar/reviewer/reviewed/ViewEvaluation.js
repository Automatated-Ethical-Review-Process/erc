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
            <Typography variant="h5" my={2}>
               Overall Comment
            </Typography>
            {/* textarea for comments */}
            <Box ml={3}>
               <TextareaAutosize
                  my={2}
                  minRows={10}
                  placeholder="This proposal has approved.Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 
            the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
             book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in"
                  style={{ width: 600 }}
               />
            </Box>
            <Link href="#" underline="hover" color="#227093">
               {"Download the Evaluation Form"}
            </Link>
         </FormControl>
      </Container>
   );
}
