import { useNavigate, useLocation } from "react-router-dom";

import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function ChooseReviewType() {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   return (
      <Container maxWidth="md" sx={{ mt: 3 }}>
         <FormControl>
            <FormLabel>Choose Reviewing Type</FormLabel>
            <RadioGroup row>
               <FormControlLabel
                  value="exemption"
                  control={<Radio />}
                  label="Exemption from review"
               />
               <FormControlLabel
                  value="expedited"
                  control={<Radio />}
                  label="Expedited review"
               />
               <FormControlLabel
                  value="full-board"
                  control={<Radio />}
                  label="Full Board review"
               />
            </RadioGroup>
         </FormControl>
         <Box position="fixed" bottom={20} right={20}>
            <Button
               variant="outlined"
               sx={{ mr: 3 }}
               onClick={() => navigate(pathname + "/assign")}
            >
               Assign Reviewers
            </Button>
            <Button variant="contained" onClick={() => alert("Completed")}>
               Finish
            </Button>
         </Box>
      </Container>
   );
}

export default ChooseReviewType;
