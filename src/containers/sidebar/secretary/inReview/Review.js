import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
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
         <Typography variant="h5" color="black" my={2}>
            Overall Comment
         </Typography>
         <TextareaAutosize
            minRows={10}
            placeholder="This proposal has approved.Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 
            the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
             book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in"
            style={{ width: 600, marginLeft: 20 }}
         />
         <br />
         <Link href="#" underline="hover" color="#227093">
            {"Download the Evaluation Form"}
         </Link>
      </Container>
   );
}
