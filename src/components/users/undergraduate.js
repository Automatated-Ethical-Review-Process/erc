import * as React from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { getUser } from "services/userService";
import Link from "@mui/material/Link";
import TextField from "components/common/TextField";

export default function Undergradute(props) {
  const { uid: userId } = useParams();
  const user = getUser(userId);

  if (!user) {
    return "Invalid user id" + userId;
  }

  const data = [
    { label: "University", value: user.university },
    { label: "Faculty", value: user.faculty },
    { label: "Reg Number", value: user.regNumber },
    // { label: "Id Photo", value: user.landNum }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {data.map((item, id) => (
          <Grid key={id} item xs={12}>
            <TextField {...item} readOnly />
          </Grid>
        ))}
      </Grid>
      <Grid mt={3} sx={12}>
        <Link href="#" underline="hover" color="#7158e2">
          {"Donwload the University ID photo"}
        </Link>
      </Grid>
      <Grid mt={2}></Grid>
      {props.children}
    </Container>
  );
}
