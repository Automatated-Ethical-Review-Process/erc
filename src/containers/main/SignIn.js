import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Controller } from "react-hook-form";

import { useLoginMutation } from "api/auth/api";
import authService from "services/auth";

import Image from "assets/meetings.jpg";
import { yEmail, yObject, yPassword } from "utils/yup";
import useForm from "hooks/useForm";

const schema = yObject({
   email: yEmail,
   password: yPassword,
});

export default function SignIn() {
   const navigate = useNavigate();
   const { state } = useLocation();

   const [login, { isLoading }] = useLoginMutation();

   const { control, handleSubmit } = useForm(schema, null);

   const [submitError, setSubmitError] = useState(
      state?.auto ? "Session was expired or unauthorized" : null
   );

   const onSubmit = ({ rememberMe, ...data }) => {
      authService.email = rememberMe ? data.email : null;
      setSubmitError(null);
      login(data)
         .unwrap()
         .then(() => navigate(state?.from ? state.from.pathname : "/"))
         .catch((err) =>
            setSubmitError(err.data?.message || "Something went wrong")
         );
   };

   const formView = (
      <Container component="main" maxWidth="xs">
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
               <Controller
                  name="email"
                  control={control}
                  defaultValue={authService.email ?? ""}
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
               <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
               <Controller
                  name="rememberMe"
                  control={control}
                  defaultValue={authService.hasEmail}
                  render={({ field: { value, ...rest } }) => (
                     <FormControlLabel
                        control={
                           <Checkbox
                              {...rest}
                              checked={value}
                              color="primary"
                           />
                        }
                        label="Remember me"
                     />
                  )}
               />
               {submitError && <Alert severity="error">{submitError}</Alert>}
               <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Typography variant="body2">
                        <Link to="/forgot-password">Forgot password?</Link>
                     </Typography>
                  </Grid>
                  <Grid item>
                     <Typography variant="body2">
                        <Link to="/signup" variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Typography>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );

   return (
      <Grid
         container
         spacing={0}
         columns={{ xs: 4, md: 12 }}
         sx={{ mt: 1, pl: 2 }}
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
               {/* {<Typography
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
                  </Typography>} */}
            </Container>
         </Grid>
         <Grid item xs={4}>
            {formView}
         </Grid>
      </Grid>
   );
}
