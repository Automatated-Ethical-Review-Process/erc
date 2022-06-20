import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
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

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

const Input = styled("input")({
   display: "none",
});

export default function SubmitEvaluation() {
   const [open1, setOpenAccept] = React.useState(false);
   const handleClickOpen1 = () => {
      setOpenAccept(true);
   };
   const handleClose1 = () => {
      setOpenAccept(false);
   };
   return (
      <Container>
         <FormControl>
            <Typography variant="h5">Decision</Typography>
            <Box ml={3}>
               <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
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
            <Typography variant="h5" my={2}>
               Overall Comment
            </Typography>
            {/* textarea for comments */}
            <Box ml={3}>
               <TextareaAutosize
                  my={2}
                  aria-label="minimum height"
                  minRows={10}
                  placeholder="add overall comment for the proposal"
                  style={{ width: 600 }}
               />
            </Box>
            <Link href="#" underline="hover" color="#227093">
               {"Download the Evaluation Form"}
            </Link>
         </FormControl>
         <Box my={2}>
            <label htmlFor="contained-button-file">
               <Button variant="contained" component="span">
                  <Input
                     accept="image/*"
                     id="contained-button-file"
                     multiple
                     type="file"
                  />
                  Upload Evaluation Form
               </Button>
               <Button variant="contained" component="span" sx={{ ml: 2 }}>
                  <Input
                     accept="image/*"
                     id="contained-button-file"
                     multiple
                     type="file"
                  />
                  Upload Reviewed Sheet
               </Button>
            </label>
            <Button
               variant="contained"
               endIcon={<SendIcon />}
               onClick={handleClickOpen1}
               sx={{
                  ml: 6,
               }}
            >
               Submit
            </Button>
         </Box>

         <Dialog
            open={open1}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose1}
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle>{"Review Submission"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Do you want to submit this review?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose1}>Cancel</Button>
               <Button onClick={handleClose1}>Submit</Button>
            </DialogActions>
         </Dialog>
      </Container>
   );
}
