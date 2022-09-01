import { Container, Grid, Typography } from "@mui/material";
import { useGetVersionQuery } from "api/data/version";
import { useParams } from "react-router-dom";

export default function ViewDecision() {
  const { pid, vid } = useParams();

  const { data = {} } = useGetVersionQuery({ pid, vid });

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Decision</Typography>
          <Typography variant="body1">{data.status}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Comment</Typography>
          <Typography variant="body1">{data.comment}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
