import * as React from "react";
import { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

import { useLoginMutation } from "api/auth/api";
import authService from "services/auth";

// import Men from "assets/men.png";
// import Woman from "assets/woman.png";

import { BasicForm } from "components/common/Form";
import {
  CheckboxController,
  PasswordFieldController,
  TextFieldController,
} from "components/controllers";
import { yEmail, yObject, yPassword } from "utils/yup";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export function ActionAreaCard(props) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          width={300}
          image={props.url}
          alt=""
        />
        <CardContent sx={props.minHeight}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function SubAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.category}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const schema = yObject({
  email: yEmail,
  password: yPassword,
});

export default function SignIn() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const [submitError, setSubmitError] = useState(window._msg);

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
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        <BasicForm schema={schema} defaultValues={null} onSubmit={onSubmit}>
          <TextFieldController
            name="email"
            label="Email Address"
            defaultValue={authService.email ?? ""}
            required
            autoComplete="email"
          />
          <PasswordFieldController
            name="password"
            label="Password"
            defaultValue=""
            required
            autoComplete="current-password"
          />
          <CheckboxController
            name="rememberMe"
            label="Remember me"
            defaultValue={authService.hasEmail}
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
        </BasicForm>
      </Box>
    </Container>
  );

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined" sx={{ my: 4, pt: 0, pb: 4 }}>
        {formView}
      </Paper>
    </Container>
  );
}
