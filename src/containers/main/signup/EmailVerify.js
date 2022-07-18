import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useSignupVerifyMutation } from "api/auth/api";
import useNotify from "hooks/useNotify";
import { yEmailSchema } from "utils/yup";
import useForm from "hooks/useForm";
import Form from "components/common/Form";
import { TextFieldController } from "components/controllers";

export default function EmailVerify() {
   const navigate = useNavigate();
   const { notify } = useNotify();

   const [signupVerify, { isLoading }] = useSignupVerifyMutation();

   const { control, handleSubmit } = useForm(yEmailSchema);

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
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <Grid item xs={12} md={4} />
                  <Grid item xs={12} md={4} mt={3}>
                     <TextFieldController
                        name="email"
                        label="Email Address"
                        control={control}
                        required
                        autoComplete="email"
                     />
                  </Grid>
                  <Grid item xs={12} md={4} />
                  <Grid item xs={12} md={4} />
                  <Grid item xs={12} md={4} align="center" mt={2}>
                     <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        color="success"
                     >
                        Verify Email
                     </Button>
                  </Grid>
                  <Grid item xs={12} md={4} />
               </Grid>
            </Form>
         </Paper>
      </Container>
   );
}
