import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container, Fab } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar";

import Image from "assets/baby.webp";
import useAuth from "hooks/useAuth";
import { useGetMeQuery } from "api/data/user";
import LoadingCircle from "components/common/LoadingCircle";
import { useGetStatusQuery } from "api/auth/api";

import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export function CustomDeleteIconChips() {
  const { data: status = {} } = useGetStatusQuery();
  if (status.isVerified) {
    return (
      <Chip label="Verified Account" icon={<DoneIcon />} color="success" />
    );
  } else {
    return (
      <Chip
        label="Not Verified Account"
        icon={<PriorityHighIcon />}
        color="error"
        variant="outlined"
      />
    );
  }
}

function ImageAvatar() {
  return (
    <Avatar alt="Profile Image" src={Image} sx={{ width: 200, height: 200 }} />
  );
}

function GridTitle({ title }) {
  return (
    <Grid item xs={6} justifyContent="center">
      <Typography variant="h7">{title}</Typography>
    </Grid>
  );
}

function GridItem({ title, body, textAlign = "center" }) {
  return (
    <>
      <GridTitle title={title} />
      <Grid item xs={6}>
        <Paper
          sx={(t) => ({ p: t.spacing(1), minHeight: t.spacing(5), textAlign })}
        >
          <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
            {body}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export function Content() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data = {}, isLoading } = useGetMeQuery();

  const { data: status = {} } = useGetStatusQuery();

  return (
    <Container maxWidth={"md"} sx={{ pb: 10 }}>
      <LoadingCircle isLoading={isLoading} />
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
        <Grid container rowSpacing={2}>
          <GridItem title="Name" body={data.name} />
          <GridItem title="Email" body={user.email} />
          <GridItem title="Phone Number" body={data.mobileNumber} />
          <GridItem title="Land Number" body={data.landNumber} />
          <GridItem title="NIC / Passport" body={data.nic || data.passport} />
          <GridItem title="Address" body={data.address} />
          <GridItem
            title="Educational Qualifications"
            body={(data.educationalQualifications || []).join("\n")}
            textAlign="left"
          />
          {data.isUnderGraduate && (
            <>
              <GridTitle title="Is Undergraduate" />
              <Grid item xs={6}>
                <Checkbox checked={data.isUnderGraduate} />
              </Grid>
              {data.isUnderGraduate ? (
                <>
                  <GridItem title="University" body={data.university} />
                  <GridItem title="Faculty" body={data.faculty} />
                  <GridItem
                    title="Registration Number"
                    body={data.registrationNumber}
                  />
                  <GridItem title="Year" body={data.year} />
                </>
              ) : (
                <>
                  <GridItem title="Occupation" body={data.occupation} />
                  <GridItem title="Position" body={data.position} />
                </>
              )}
            </>
          )}
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          marginTop={2}
          marginBottom={2}
        >
          <CustomDeleteIconChips />
        </Grid>
      </Box>
      <Fab
        variant="extended"
        color="secondary"
        sx={(t) => ({
          position: "fixed",
          right: t.spacing(4),
          bottom: t.spacing(4),
        })}
        onClick={() => navigate("/profile/edit")}
      >
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </Fab>
    </Container>
  );
}

export default function ShowProfile() {
  return (
    <NavigationBar title="Profile">
      <Content />
    </NavigationBar>
  );
}
