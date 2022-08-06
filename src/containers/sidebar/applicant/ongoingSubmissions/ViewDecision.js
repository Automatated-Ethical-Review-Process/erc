import { Typography, Grid, Container } from "@mui/material";
import { Box } from "@mui/system";

export default function ViewDecision() {
  return (
    <Container>
      <Box>
        <Grid>
          <Grid>
            <Typography>
              <h2>This is a Major Modification.</h2>
            </Typography>
          </Grid>
          <Grid>
            <Typography>
              <h4>Comments - </h4>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
