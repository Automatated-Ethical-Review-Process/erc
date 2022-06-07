import * as React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function EmailVerify() {
  return (
    <Container>
      <Paper variant="outlined" sx={{ my: 2 }}>
        <Grid container space={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" textAlign={"center"}>
              Welcome!
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1" textAlign={"center"}>
              You need to verify your email acount.Enter the email address and
              press the button below.It will send you an email to your email
              account.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="email-1"
              fullWidth
              label="Input Email Address"
              variant="outlined"
              required
              sx={{
                mt: 4,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <Button
              sx={{
                mx: "30%",
                mt: 2,
              }}
              variant="contained"
              color="success"
            >
              Verify Email
            </Button>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
