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

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useLoginMutation } from "api/auth/api";

import Image from "assests/meetings.jpg";

const loginSchema = Yup.object()
   .shape({
      email: Yup.string()
         .required("Email is required")
         .email("Email is invalid"),
      password: Yup.string()
         .required("Password is required")
         .min(6, "Password must be at least 6 characters")
         .max(40, "Password must not exceed 40 characters"),
   })
   .required();

export default function SignIn() {
   const navigate = useNavigate();
   const { state } = useLocation();

   const [login, { isLoading }] = useLoginMutation();

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: yupResolver(loginSchema) });

   const onSubmit = (data) => {
      login(data)
         .unwrap()
         .then(() => navigate(state && state.from ? state.from.pathname : "/"))
         .catch((err) => console.log(err));
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
            <Avatar sx={{ m: 1, backgroundColor: "#1976d2" }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign In
            </Typography>
            <Box
               component="form"
               onSubmit={handleSubmit(onSubmit)}
               noValidate
               sx={{ mt: 1 }}
            >
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                        autoFocus
                     />
                  )}
               />
               <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                     />
                  )}
               />
               <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
               />
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
