import { useEffect, useRef, useState } from "react";

import {
   useNavigate,
   useSearchParams,
   Navigate,
   useParams,
} from "react-router-dom";
import {
   Button,
   CircularProgress,
   Container,
   Grid,
   Paper,
   Typography,
} from "@mui/material";

import { useUpdateEmailMutation, useValidateMutation } from "api/auth/api";
import routes from "config/routes";
import { isUuid } from "utils/yup";

function UpdateEmail({ token }) {
   const navigate = useNavigate();

   const [validate, { isLoading: isLoadingValidate }] = useValidateMutation();
   const [update, { isLoading: isLoadingUpdate }] = useUpdateEmailMutation();

   const isLoading = isLoadingValidate || isLoadingUpdate;

   const [msg, setMsg] = useState("Verifying token ...");
   const [checked, setChecked] = useState(false);

   const setResult = (res) => {
      setMsg(res);
      setChecked(true);
   };

   const ref = useRef();
   useEffect(() => {
      if (ref.current) {
         return;
      }
      ref.current = true;
      validate(token)
         .unwrap()
         .then(() => {
            setMsg("updating email ...");
            update(token)
               .unwrap()
               .then(() => setResult("email updated successfully."))
               .catch(() => setResult("failed while updating email."));
         })
         .catch(() => setResult("invalid token."));
   }, [validate, update, token]);

   return (
      <Paper sx={{ mt: 3, py: 5 }}>
         <Grid container space={3}>
            <Grid item xs={12} md={12}>
               <Typography variant="h4" textAlign="center">
                  Update Email{" "}
                  {isLoading && <CircularProgress color="primary" size={30} />}
               </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
               <Typography variant="body1" textAlign="center">
                  {msg}
               </Typography>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} align="center">
               {checked && (
                  <Button
                     sx={{
                        mt: 2,
                     }}
                     variant="contained"
                     color="success"
                     onClick={() => navigate(routes.home, { replace: true })}
                  >
                     Go Home
                  </Button>
               )}
            </Grid>
            <Grid item xs={12} md={4}></Grid>
         </Grid>
      </Paper>
   );
}

function Update() {
   const { entry } = useParams();
   const [searchParams] = useSearchParams();

   if (entry === "email") {
      const token = searchParams.get("token");

      if (token && isUuid(token)) {
         return (
            <Container>
               <UpdateEmail token={token} />
            </Container>
         );
      }
   }

   return <Navigate to={routes.home} replace={true} />;
}

export default Update;
