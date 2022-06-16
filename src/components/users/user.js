import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { getUser } from "services/data/userService";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import TextField from "components/common/TextField";
import RadioGroup from "@mui/material/RadioGroup";

export default function User(props) {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const { uid: userId } = useParams();
   const user = getUser(userId);

   if (!user) {
      return "Invalid user id" + userId;
   }

   const data = [
      { label: "ID", value: user.id },
      { label: "Name", value: user.name },
      { label: "Address", value: user.address },
      { label: "Phone Number", value: user.phoneNum },
      { label: "Land Number", value: user.landNum },
      { label: "Email", value: user.email },
      { label: "Nic/Passport", value: user.nic },
      { label: "Highest Education", value: user.highestEducation },
      { label: "Create Date", value: user.createdDate },
   ];

   return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Grid container spacing={4}>
            {data.map((item, id) => (
               <Grid key={id} item xs={12}>
                  <TextField {...item} readOnly />
               </Grid>
            ))}
            <Grid item xs={12}>
               <FormControl>
                  <RadioGroup defaultValue="Undergraduate">
                     <FormControlLabel
                        value="Undergraduate"
                        control={<Radio />}
                        label="Undergarduate"
                        defaultValue="Undergraduate"
                     />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item md={2}></Grid>
            <Grid item md={8}></Grid>
            <Grid item xs={12} md={2}>
               <Button
                  variant="contained"
                  onClick={() => navigate(`${pathname}/undergraduate`)}
                  sx={{ width: 120 }}
               >
                  Next
               </Button>
            </Grid>
         </Grid>
         {props.children}
      </Container>
   );
}
