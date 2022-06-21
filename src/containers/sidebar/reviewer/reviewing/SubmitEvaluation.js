import { useState, forwardRef } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Container } from "@mui/material";
import { Box } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

const Input = styled("input")({
   display: "none",
});

export default function SubmitEvaluation() {
   const [open, setOpenAccept] = useState(false);

   const handleClickOpen = () => {
      setOpenAccept(true);
   };
   const handleClose = () => {
      setOpenAccept(false);
   };
   return (
      <Container sx={{ mt: 10 }}>
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
                  />
                  <FormControlLabel
                     value="mj_modification"
                     control={<Radio />}
                     label="Major Modification"
                  />
                  <FormControlLabel
                     value="mn_modification"
                     control={<Radio />}
                     label="Minor Modification"
                  />
                  <FormControlLabel
                     value="disapprove"
                     control={<Radio />}
                     label="Disapprove"
                  />
               </RadioGroup>
            </Box>

            <Link href="#" underline="hover" color="#227093">
               {"Download the Evaluation Form"}
            </Link>
         </FormControl>
         <Box my={2}>
            <label htmlFor="contained-button-file">
               <Button variant="contained" component="span">
                  <Input
                     accept="pdf/*"
                     id="contained-button-file"
                     multiple
                     type="file"
                  />
                  Upload Evaluation Form
               </Button>
            </label>
            <Button
               variant="contained"
               endIcon={<SendIcon />}
               onClick={handleClickOpen}
               sx={{
                  ml: 2,
               }}
            >
               Submit
            </Button>
         </Box>

         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
         >
            <DialogTitle>{"Review Submission"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Do you want to submit this review?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
         </Dialog>
      </Container>
   );
}
