import * as React from "react";
import { useEffect, useState, useRef } from "react";

import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

import LoadingCircle from "components/common/LoadingCircle";
import NavigationBar from "components/NavigationBar";
import useNotify from "hooks/useNotify";

import {
  useCheckPasswordMutation,
  useUpdateEmailVerifyMutation,
  useUpdatePasswordMutation,
} from "api/auth/api";
import { useGetMeQuery, useUpdateMeMutation } from "api/data/user";
import Image from "assets/baby.webp";
import Form from "components/common/Form";
import {
  PasswordFieldController,
  TextPasswordFieldController,
} from "components/controllers";
import useAuth from "hooks/useAuth";
import useForm from "hooks/useForm";
import {
  yAddress,
  yEducationalQualifications,
  yEmailSchema,
  yLandNumber,
  yMobileNumber,
  yObject,
  yPassword,
  yPasswordSchema,
  yRef,
} from "utils/yup";

function ImageAvatar() {
  return (
    <Avatar alt="Profile Image" src={Image} sx={{ width: 200, height: 200 }} />
  );
}

function GridItem({ title, isPassword, ...rest }) {
  return (
    <>
      <Grid item xs={6}>
        <Typography variant="h7">{title}</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextPasswordFieldController
          isPassword={isPassword}
          margin="none"
          size="small"
          {...rest}
        />
      </Grid>
    </>
  );
}

const schemaDetails = yObject({
  mobileNumber: yMobileNumber,
  landNumber: yLandNumber,
  address: yAddress,
  educationalQualifications: yEducationalQualifications,
});

function EditDetails() {
  const { data, isLoading: isLoadingGet, isSuccess } = useGetMeQuery();
  const [updateMe, { isLoading: isLoadingUpdate }] = useUpdateMeMutation();

  const isLoading = isLoadingGet || isLoadingUpdate;

  const { notify } = useNotify();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm(schemaDetails);

  useEffect(() => {
    if (isSuccess && data) {
      reset({
        ...data,
        educationalQualifications: (data.educationalQualifications || []).join(
          "\n"
        ),
      });
    }
  }, [isSuccess, reset, data]);

  const onSubmit = ({ educationalQualifications, ...data }) => {
    const finalData = {
      ...data,
      educationalQualifications: educationalQualifications
        .split("\n")
        .filter((i) => i),
    };

    updateMe(finalData)
      .unwrap()
      .then(() => notify("Account details updated", "success"))
      .catch(() => notify("Something went wrong", "error"));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} control={control}>
      <LoadingCircle isLoading={isLoading} />
      <Grid container rowSpacing={2}>
        <GridItem title="Phone Number" name="mobileNumber" />
        <GridItem title="Land Number" name="landNumber" />
        <GridItem title="Address" name="address" />
        <GridItem
          title="Educational Qualifications"
          name="educationalQualifications"
          multiline
          rows={4}
        />
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button variant="contained" type="submit" disabled={!isDirty}>
            Update Details
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RequestForReviewer() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // onClick(ref.current.value);
    handleClose();
  };
  const ref = useRef();
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleClickOpen}
        >
          Send Request to switch Reviewer
        </Button>
      </Stack>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Do you want to switch this account to Reviewr?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Enter your reason for hear ...
          </DialogContentText>
          <TextField
            inputRef={ref}
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function DisableAccount() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // onClick(ref.current.value);
    handleClose();
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
          Disable Account
        </Button>
      </Stack>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to disable this account?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function EditEmail() {
  const { user } = useAuth();
  const { notify } = useNotify();

  const [checkPassword, { isLoading: checkIsLoading }] =
    useCheckPasswordMutation();
  const [updateEmailVerify, { isLoading: updateIsLoading }] =
    useUpdateEmailVerifyMutation();

  const isLoading = checkIsLoading || updateIsLoading;

  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    formState: { isDirty },
    getValues,
    reset: resetEmail,
  } = useForm(yEmailSchema, { email: user.email ?? "" });

  const onSubmitEmail = () => setOpen(true);

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    setError,
    reset: resetPassword,
  } = useForm(yPasswordSchema);

  const [open, setOpen] = useState(false);

  const onCancel = () => setOpen(false);

  const onSubmitPassword = ({ password }) => {
    checkPassword({ password })
      .unwrap()
      .then(() => {
        setOpen(false);
        updateEmailVerify({
          oldEmail: user.email,
          newEmail: getValues("email"),
        })
          .unwrap()
          .then(({ token }) => {
            resetEmail();
            resetPassword();
            notify("Please verify your email", "info", {
              persist: true,
            });
            console.log(
              `${window.location.href
                .split("/")
                .slice(0, 3)
                .join("/")}/update/email?token=${token}`
            );
          })
          .catch((err) => notify(err.data?.message || "Bad request", "error"));
      })
      .catch(() => setError("password", { message: "Invalid password" }));
  };

  return (
    <>
      <LoadingCircle isLoading={isLoading} />
      <Form control={controlEmail} onSubmit={handleSubmitEmail(onSubmitEmail)}>
        <Grid container rowSpacing={2}>
          <GridItem title="Email" name="email" />
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Button variant="contained" disabled={!isDirty} type="submit">
              Update Email
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Update Email</DialogTitle>
        <Form
          control={controlPassword}
          onSubmit={handleSubmitPassword(onSubmitPassword)}
        >
          <DialogContent>
            <DialogContentText>Please enter your password.</DialogContentText>
            <PasswordFieldController
              name="password"
              label="Password"
              autoFocus
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
}

const schemaConfirmPassword = yObject({
  oldPassword: yPassword,
  newPassword: yPassword.notOneOf(
    [yRef("oldPassword")],
    "New password same as old"
  ),
  confirmPassword: yPassword.oneOf(
    [yRef("newPassword")],
    "Do not match with new password"
  ),
});

function EditPassword() {
  const { notify } = useNotify(true);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
    setError,
  } = useForm(schemaConfirmPassword);

  const onSubmit = ({ oldPassword, newPassword }) =>
    updatePassword({
      oldPassword,
      newPassword,
    })
      .unwrap()
      .then(() => {
        reset();
        notify("Password updated", "success");
      })
      .catch(() => setError("oldPassword", { message: "Did not match" }));

  return (
    <Form control={control} onSubmit={handleSubmit(onSubmit)}>
      <LoadingCircle isLoading={isLoading} />
      <Grid container rowSpacing={2}>
        <GridItem
          title="Old Password"
          name="oldPassword"
          label="Old"
          isPassword={true}
        />
        <GridItem
          title="New Password"
          name="newPassword"
          label="New"
          isPassword={true}
        />
        <GridItem
          title="Confirm Password"
          name="confirmPassword"
          label="Confirm"
          isPassword={true}
        />
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button variant="contained" disabled={!isDirty} type="submit">
            Update Password
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}

function Content() {
  const navigate = useNavigate();
  return (
    <Container maxWidth={"md"} sx={{ pb: 10 }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        marginTop={2}
        marginBottom={2}
      >
        <ImageAvatar />
      </Grid>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <EditDetails />
          <Divider />
          <EditEmail />
          <Divider />
          <EditPassword />
          <Divider />
          <RequestForReviewer />
          <DisableAccount />
        </Stack>
      </Box>
      <Fab
        variant="extended"
        color="warning"
        sx={(t) => ({
          position: "fixed",
          right: t.spacing(4),
          bottom: t.spacing(4),
        })}
        onClick={() => navigate(-1)}
      >
        <CloseIcon sx={{ mr: 1 }} />
        Cancel
      </Fab>
    </Container>
  );
}

export default function EditProfile() {
  return (
    <NavigationBar title="Profile">
      <Content />
    </NavigationBar>
  );
}
