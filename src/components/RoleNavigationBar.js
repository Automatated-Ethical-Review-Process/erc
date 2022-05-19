import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

const RoleNavigationBar = () => {
   const [btnValueInRoleMobile, setBtnValueInRoleMobile] =
      useState("Choose Role");
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [roles, setRoles] = useState([
      "Applicant",
      "Reviewer",
      "Clerk",
      "Secretary",
   ]);
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
         <Box
            sx={{
               mt: 3,
               mb:1,
               display: { xs: "none", md: "block" },
               mx: "auto",
               width: 150 * roles.length + 10 * (roles.length - 1),
            }}
         >
            <Stack direction="row" spacing={10} component="div">
               {roles.map((value, index) => (
                  <Button key={index} variant="outlined" sx={{ width: 150 }}>
                     {value}
                  </Button>
               ))}
            </Stack>
         </Box>
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
