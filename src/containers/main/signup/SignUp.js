import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import { useSignupMutation, useValidateMutation } from "api/auth/api";
import LoadingCircle from "components/common/LoadingCircle";
import useNotify from "hooks/useNotify";
import { isUuid } from "utils/yup";
import EmailVerify from "./EmailVerify";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import hash from "utils/hash";

const steps = ["Step 1", "Step 2", "Step 3"];

function StepContent({ step, ...rest }) {
  switch (step) {
    case 0:
      return <Step1 {...rest} />;
    case 1:
      return <Step2 {...rest} />;
    case 2:
      return <Step3 {...rest} />;
    default:
      throw new Error("Unknown step");
  }
}

const initialState = {
  name: "",
  mobileNumber: "",
  landNumber: "",
  nicPassport: "",
  address: "",
  educationalQualifications: "",
  isUnderGraduate: true,
  occupation: "",
  position: "",
  university: "",
  faculty: "",
  year: "",
  registrationNumber: "",
  password: "",
  confirmPassword: "",
};

function Content({ token, activeStep, handleNext, handleReset, children }) {
  const [data, setData] = useState(initialState);

  if (activeStep !== 0 && data === initialState) {
    Promise.resolve().then(handleReset);
  }

  const [signup, { isLoading }] = useSignupMutation();
  const { notify } = useNotify();

  const onRegister = (body) =>
    signup({ id: token, body })
      .unwrap()
      .then(handleNext)
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );

  const onParse = (finalData) => {
    const {
      nicPassport,
      educationalQualifications: eq,
      password,
      confirmPassword,
      ...data
    } = finalData;

    let nic = "",
      passport = "";

    if (Number(nicPassport.charAt(0))) {
      nic = nicPassport;
    } else {
      passport = nicPassport;
    }

    const parsed = {
      ...data,
      nic,
      passport,
      password: hash(password),
      educationalQualifications: eq.split("\n").filter((i) => i),
    };

    onRegister(parsed);
  };

  const onSubmit = (_data) => {
    const newData = { ...data, ..._data };
    setData(newData);
    activeStep === 2 ? onParse(newData) : handleNext();
  };

  return (
    <>
      <LoadingCircle isLoading={isLoading} />
      <StepContent step={activeStep} {...{ onSubmit, data, children }} />
    </>
  );
}

function SignUpInput({ token }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Container component="main" maxWidth="md">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Registration
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label, id) => (
            <Step key={id}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Your account has been created successfully.
            </Typography>
            <Button
              sx={{
                mt: 2,
              }}
              variant="contained"
              color="success"
              onClick={() => navigate("/", { replace: true })}
            >
              Sign In
            </Button>
          </>
        ) : (
          <Content
            token={token}
            activeStep={activeStep}
            handleNext={handleNext}
            handleReset={handleReset}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? "Register" : "Next"}
              </Button>
            </Box>
          </Content>
        )}
      </Paper>
    </Container>
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
    <SignUpInput token={token} />
  ) : (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ my: 6, p: 4 }}>
        <Typography align="center">Verifying token ...</Typography>
      </Paper>
    </Container>
  );
}

export default function SignUp() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  if (token && isUuid(token)) {
    return <CheckToken token={token} />;
  }

  return <EmailVerify />;
}
