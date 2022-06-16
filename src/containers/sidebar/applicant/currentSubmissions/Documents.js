import { useState, useEffect, useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import BaseDocuments from "components/proposals/Documents";

export function ScrollDialog() {
   const [open, setOpen] = useState(false);
   const [scroll, setScroll] = useState("paper");

   const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const descriptionElementRef = useRef(null);

   useEffect(() => {
      if (open) {
         const { current: descriptionElement } = descriptionElementRef;
         if (descriptionElement !== null) {
            descriptionElement.focus();
         }
      }
   }, [open]);

   return (
      <div>
         <Button variant="contained" onClick={handleClickOpen("paper")}>
            View decision and comments
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
         >
            <DialogTitle id="scroll-dialog-title">
               The decision is a Minor Modification
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
               <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
               >
                  {[...new Array(50)]
                     .map(() => `Comments for the version.`)
                     .join("\n")}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Close</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

export default function Documents() {
   return (
      <BaseDocuments>
         <ScrollDialog />
      </BaseDocuments>
   );
}
