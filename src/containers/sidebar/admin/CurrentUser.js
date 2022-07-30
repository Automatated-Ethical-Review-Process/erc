import { useNavigate } from "react-router-dom";

import { Button, Grid } from "@mui/material";

import BaseUser from "components/users/user";

export default function UserDetails() {
  const navigate = useNavigate();

  return (
    <BaseUser>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => navigate("update")}
          sx={{ width: 120 }}
        >
          Update
        </Button>
      </Grid>
    </BaseUser>
  );
}
