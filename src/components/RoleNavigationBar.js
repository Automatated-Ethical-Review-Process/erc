import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "api/auth/api";
import Roles, { toRole } from "config/roles";

import { ThemeContext } from "context/ThemeContext";

const RoleNavigationBar = ({ role }) => {
   const { theme } = useContext(ThemeContext);
   const { roles } = useSelector(selectCurrentUser);

   const navigate = useNavigate();

   const [btnValueInRoleMobile, setBtnValueInRoleMobile] =
      useState("Choose Role");
   const [open, setOpen] = useState(false);

   const readableRoles = [];

   if (roles.includes(Roles.admin)) readableRoles.push("Admin");
   if (roles.includes(Roles.secretary)) readableRoles.push("Secretary");
   if (roles.includes(Roles.reviewer)) readableRoles.push("Reviewer");
   if (roles.includes(Roles.clerk)) readableRoles.push("Clerk");
   if (roles.includes(Roles.applicant)) readableRoles.push("Applicant");

   if (readableRoles.length <= 1) {
      return null;
   }

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const button = (value, index, onClick) => (
      <Button
         key={index}
         variant="outlined"
         sx={{
            width: 150,
            boxSizing: "border-box",
            fontFamily: theme.font.button.family,
            color: index === selectIndex ? "white" : theme.color.main.primary,
            borderColor: theme.color.main.primary,
            backgroundColor:
               index === selectIndex ? theme.color.main.primary : "white",
            fontWeight: 700,
            "&:hover": {
               borderColor: theme.color.main.primary,
               boxShadow: 20,
               color: index === selectIndex ? theme.color.main.primary : "",
               backgroundColor: index === selectIndex ? "white" : "",
               transitionDuration: "0.6s",
            },
         }}
         onClick={onClick}
      >
         {value}
      </Button>
   );

   const selectIndex = readableRoles.map((s) => toRole(s)).indexOf(role);

   return (
      <>
         <Stack
            display={{ xs: "none", md: "flex" }}
            justifyContent="space-evenly"
            direction="row"
            mb={2}
         >
            {readableRoles.map((value, index) =>
               button(value, index, () =>
                  navigate("/" + readableRoles[index].toLowerCase())
               )
            )}
         </Stack>

         <Box
            display={{ xs: "flex", md: "none" }}
            justifyContent="center"
            mb={2}
         >
            {button(btnValueInRoleMobile, 1, handleOpen)}
            <Modal open={open} onClose={handleClose}>
               <Box
                  sx={{
                     position: "absolute",
                     top: "50%",
                     left: "50%",
                     transform: "translate(-50%, -50%)",
                     width: 200,
                     bgcolor: "background.paper",
                     boxShadow: 24,
                     p: 4,
                     borderRadius: 4,
                  }}
               >
                  <Stack direction="column" spacing={2}>
                     {readableRoles.map((value, index) =>
                        button(value, index, () => {
                           setBtnValueInRoleMobile(value);
                           handleClose();
                           navigate("/" + readableRoles[index].toLowerCase());
                        })
                     )}
                  </Stack>
               </Box>
            </Modal>
         </Box>
      </>
   );
};

export default RoleNavigationBar;
