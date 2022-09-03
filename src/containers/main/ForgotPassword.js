import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  useForgotPasswordMutation,
  useForgotPasswordVerifyMutation,
  useValidateMutation,
} from "api/auth/api";
import { BasicForm } from "components/common/Form";
import {
  PasswordFieldController,
  TextFieldController,
} from "components/controllers";
import useNotify from "hooks/useNotify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isUuid, yEmailSchema, yObject, yPassword, yRef } from "utils/yup";
import hash from "utils/hash";

function Step1({ handleNext }) {
  const navigate = useNavigate();
  const { notify } = useNotify();

  const [forgotPasswordVerify, { isLoading }] =
    useForgotPasswordVerifyMutation();

  const onSubmit = (data) => {
    forgotPasswordVerify(data)
      .unwrap()
      .then(({ token }) => {
        handleNext();
        console.log(
          `${window.location.href
            .split("/")
            .slice(0, 3)
            .join("/")}/forgot-password?token=${token}`
        );
      })
      .catch(() => notify("Email not registered", "error"));
  };

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Just enter your email address, and we will send you a link to reset your
        password.
      </Typography>
      <BasicForm schema={yEmailSchema} onSubmit={onSubmit}>
        <TextFieldController
          name="email"
          label="Email Address"
          required
          autoComplete="email"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ mt: 3, ml: 1 }} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, ml: 1 }}
          >
            Continue
          </Button>
        </Box>
      </BasicForm>
    </>
  );
}

function Step2() {
  return (
    <Typography variant="body1" gutterBottom>
      We've sent an email. Please check the email and follow the directions to
      reset the password.
    </Typography>
  );
}

function ForgotPasswordVerify() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Reset your password
        </Typography>
        <br />
        {activeStep === 0 ? <Step1 handleNext={handleNext} /> : <Step2 />}
      </Paper>
    </Container>
  );
}

const passwordSchema = yObject({
  password: yPassword,
  confirmPassword: yPassword.oneOf(
    [yRef("password")],
    "Your passwords do not match"
  ),
});

function ForgotPasswordInput({ token }) {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const navigate = useNavigate();
  const { notify } = useNotify();

  const onSubmit = ({ password }) =>
    forgotPassword({ id: token, password: hash(password) })
      .unwrap()
      .then(() => {
        notify("Password reset successfully", "success", { persist: true });
        navigate("/", { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );

  return (
    <>
      <Typography align="center" variant="h5">
        Reset your password
      </Typography>
      <BasicForm schema={passwordSchema} onSubmit={onSubmit}>
        <PasswordFieldController
          name="password"
          label="New password"
          required
        />
        <PasswordFieldController
          name="confirmPassword"
          label="Confirm password"
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
          sx={{ mt: 3 }}
        >
          Reset
        </Button>
      </BasicForm>
    </>
  );
}

function CheckToken({ token }) {
  const [validate] = useValidateMutation();

  const { notify } = useNotify();
  const navigate = useNavigate();
  const [valid, setValid] = useState();

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    validate(token)
      .unwrap()
      .then(() => setValid(true))
      .catch(() => {
        notify("Invalid token", "error");
        navigate("/", { replace: true });
      });
  }, [validate, notify, navigate, token]);

  return valid ? (
    <ForgotPasswordInput token={token} />
  ) : (
    <Typography align="center">Verifying token ...</Typography>
  );
}

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  if (token && isUuid(token)) {
    return (
      <Container component="main" maxWidth="sm">
        <Paper sx={{ my: 6, p: 4 }}>
          <CheckToken token={token} />
        </Paper>
      </Container>
    );
  }

  return <ForgotPasswordVerify />;
}
