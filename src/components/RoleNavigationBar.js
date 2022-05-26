import React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";

const RoleNavigationBar = (props) => {
   const { theme } = useContext(ThemeContext);
   const navigate = useNavigate();

   const [btnValueInRoleMobile, setBtnValueInRoleMobile] =
      useState("Choose Role");
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const roles = ["Applicant", "Reviewer", "Clerk", "Secretary"];
   const path = [
      "/applicant/new-submission",
      "/reviewer/pending",
      "/clerk/new-user-requests",
      "/secretary/unassigned",
   ];
   const [selectIndex, setSelectedIndex] = useState(null);

   useEffect(() => {
      switch (props.role) {
         case "secretary":
            setSelectedIndex(3);
            break;
         case "reviewer":
            setSelectedIndex(1);
            break;
         case "clerk":
            setSelectedIndex(2);
            break;
         case "applicant":
            setSelectedIndex(0);
            break;
      }
   }, []);

   const handleMobileRole = (role) => {
      switch (role) {
         case "reviewer":
            setBtnValueInRoleMobile("Reviewer");
            break;
         case "secretary":
            setBtnValueInRoleMobile("Secretary");
            break;
         case "clerk":
            setBtnValueInRoleMobile("Clerk");
            break;
         default:
            setBtnValueInRoleMobile("Applicant");
            break;
      }
   };

   const ModalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 200,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
   };
   return (
      <>
         {
            <Box
               sx={{
                  mt: 3,
                  mb: 1,
                  display: { xs: "none", md: "block" },
                  mx: "auto",
                  width: 150 * roles.length + 10 * (roles.length - 1),
               }}
            >
               <Stack direction="row" spacing={10} component="div">
                  {roles.map((value, index) => (
                     <Button
                        key={index}
                        variant="outlined"
                        sx={{
                           width: 150,
                           boxSizing: "border-box",
                           fontFamily: theme.font.button.family,
                           color:
                              index === selectIndex
                                 ? "white"
                                 : theme.color.main.primary,
                           borderColor: theme.color.main.primary,
                           backgroundColor:
                              index === selectIndex
                                 ? theme.color.main.primary
                                 : "white",
                           fontWeight: 700,
                           "&:hover": {
                              borderColor: theme.color.main.primary,
                              boxShadow: 20,
                              color:
                                 index === selectIndex
                                    ? theme.color.main.primary
                                    : "",
                              backgroundColor:
                                 index === selectIndex ? "white" : "",
                              transitionDuration: "0.6s",
                           },
                        }}
                        onClick={() => {
                           navigate(path[index]);
                        }}
                     >
                        {value}
                     </Button>
                  ))}
               </Stack>
            </Box>
         }

         <Box
            sx={{
               display: { xs: "block", md: "none" },
               mt: 3,
            }}
         >
            <Box sx={{ mx: "auto", width: 150 }}>
               <Button
                  onClick={handleOpen}
                  variant="outlined"
                  sx={{ width: 150 }}
               >
                  {roles.length === 1 ? roles[0] : btnValueInRoleMobile}
               </Button>
            </Box>
            <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <Box sx={ModalStyle}>
                  <Stack direction="column" spacing={2}>
                     {roles.map((value, index) => {
                        return (
                           <Button
                              key={index}
                              variant="outlined"
                              onClick={() => {
                                 handleMobileRole(value.toLowerCase());
                                 handleClose();
                                 navigate(path[index]);
                              }}
                           >
                              {value}
                           </Button>
                        );
                     })}
                  </Stack>
               </Box>
            </Modal>
         </Box>
      </>
   );
};

export default RoleNavigationBar;
