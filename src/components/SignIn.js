import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Image from "../assests/meetings.jpg";

export default function SignIn() {
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get("email"),
         password: data.get("password"),
      });
      navigate("/clerk");
   };

   const formView = (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign In
            </Typography>
            <Box
               component="form"
               onSubmit={handleSubmit}
               noValidate
               sx={{ mt: 1 }}
            >
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
               />
               <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link href="/forgot-password" variant="body2">
                        Forgot password?
                     </Link>
                  </Grid>
                  <Grid item>
                     <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );

   return (
      <React.Fragment>
         <Grid
            container
            spacing={0}
            columns={{ xs: 4, md: 12 }}
            sx={{ mt: 1, mx: 1 }}
         >
            <Grid item xs={4} md={7}>
               <Container
                  sx={{
                     backgroundImage: `url(${Image})`,
                     height: "100%",
                     width: "100%",
                     opacity: 1,
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                     backgroundSize: "cover",
                     
                  }}
               >
                  <Typography
                     align="justify"
                     sx={{ fontFamily: "monospace", letterSpacing: 2 }}
                  >
                     Ethical review Committee (ERC), Faculty of Medicine (FOM),
                     University of Ruhuna (UOR) reviews all types of research
                     proposals involving human and animal studies. It was
                     established in 1980. Membership of Federation of Ethical
                     Review Committees of Sri Lanka (FERCSL) was obtained by
                     ERC, FOM, UOR in 2017. The objective is to maintain
                     standards of practice in research, including protection of
                     human participants, animals and other living organisms,
                     while promoting high quality research which is ethically
                     and scientifically sound. The ERC is involved in the
                     capacity building in research ethics and clinical ethics
                     among the academics, students and the scientific community
                     in Southern Province.Ethics review committee, Faculty of
                     Medicine, University of Ruhuna underwent the international
                     recognition survey conducted by the Forum for Ethical
                     Review Committees in the Asian and Western Pacific (FERCAP)
                     region during 28th to 30th June 2018. It was an extensive
                     survey by a team of four surveyors (including two foreign
                     surveyors) and nine survey trainees. The committee awarded
                     the SIDCER (Strategic Initiative for Developing Capacity in
                     Ethical Review) recognition at the FERCAP conference, Chang
                     Gung Memorial Hospital,Taoyuan City, Taiwan 18th -21st
                     November 2018.
                  </Typography>
               </Container>
            </Grid>
            <Grid item xs={4}>
               {formView}
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
