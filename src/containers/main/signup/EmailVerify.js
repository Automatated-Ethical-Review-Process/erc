import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useSignupVerifyMutation } from "api/auth/api";
import useNotify from "hooks/useNotify";
import { yEmailSchema } from "utils/yup";

export default function EmailVerify() {
   const navigate = useNavigate();
   const { notify } = useNotify();

   const [signupVerify, { isLoading }] = useSignupVerifyMutation();

   const { control, handleSubmit } = useForm({
      resolver: yupResolver(yEmailSchema),
   });

   const onSubmit = (data) => {
      signupVerify(data)
         .unwrap()
         .then(({ token }) => {
            console.log(
               `${window.location.href
                  .split("/")
                  .slice(0, 3)
                  .join("/")}/signup?token=${token}`
            );
            notify("Please verify your email", "info", { persist: true });
            navigate("/", { replace: true });
         })
         .catch(({ data }) =>
            notify(data?.message || "Something went wrong", "error")
         );
   };

   return (
      <Container component="main" maxWidth="md">
         <Paper variant="outlined" sx={{ mt: 4, p: 4 }}>
            <Box
               component="form"
               onSubmit={handleSubmit(onSubmit)}
               noValidate
               sx={{ mt: 1 }}
            >
               <Grid container space={3}>
                  <Grid item xs={12} md={12}>
                     <Typography variant="h3" textAlign={"center"}>
                        Welcome!
                     </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                     <Typography variant="body1" textAlign={"center"}>
                        You need to verify your email account. Enter the email
                        address and press the button below. It will send you an
                        email to your email account.
                     </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid item xs={12} md={4}>
                     <Controller
                        name="email"
                        control={control}
                        defaultValue=""
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
                              sx={{
                                 mt: 4,
                              }}
                           />
                        )}
                     />
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid item xs={12} md={4} align="center">
                     <Button
                        sx={{
                           mt: 2,
                        }}
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        color="success"
                     >
                        Verify Email
                     </Button>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
               </Grid>
            </Box>
         </Paper>
      </Container>
   );
}
