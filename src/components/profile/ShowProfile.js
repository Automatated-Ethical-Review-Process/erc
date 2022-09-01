import EditIcon from "@mui/icons-material/Edit";
import { Container, Fab } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar";

import { useGetMeQuery, useSetIdPhotoMutation } from "api/data/user";
import Image from "assets/profile-pic.jpg";
import LoadingCircle from "components/common/LoadingCircle";
import useAuth from "hooks/useAuth";

import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Chip from "@mui/material/Chip";
import useFile from "hooks/useFile";
import useNotify from "hooks/useNotify";
import useUser from "hooks/useUser";

function VerifyStatus({ isUnderGraduate, verificationImage }) {
  // verificationImage = 1;
  const user = useUser();
  const { notify } = useNotify();

  const [setIdPhoto, { isLoading }] = useSetIdPhotoMutation();

  if (user.state) {
    return (
      <Chip label="Verified Account" icon={<DoneIcon />} color="success" />
    );
  }

  if (user.userMessage || !verificationImage) {
    // TODO: need a help from the backend. userMessage should clear after updating the verificationImage
    const onChange = (file) =>
      setIdPhoto({ file })
        .unwrap()
        .then(() => notify("ID photo updated", "success"))
        .catch(({ data }) =>
          notify(data?.message || "Error updating photo", "error")
        );

    return (
      <>
        <LoadingCircle isLoading={isLoading} />
        <Chip
          label="Account Not Verified"
          icon={<PriorityHighIcon />}
          color="error"
          variant="outlined"
        />
        <Chip
          label={
            user.userMessage ||
            `Please upload the ${
              isUnderGraduate ? "University ID" : "ID or Passport"
            } photo`
          }
          icon={<PriorityHighIcon />}
          color="warning"
          variant="outlined"
          sx={{ my: 1 }}
        />
        <label htmlFor="id-photo-input">
          <Button component="span" variant="outlined">
            Upload ID photo
          </Button>
          <input
            id="id-photo-input"
            onChange={(e) => onChange(e.target.files)}
            hidden
            accept="image/*"
            type="file"
          />
        </label>
      </>
    );
  }

  return (
    <Chip
      label="Account is not Verified. Still in the process"
      icon={<PriorityHighIcon />}
      color="warning"
      variant="outlined"
    />
  );
}

function ImageAvatar({ src }) {
  const { link } = useFile(src, Image);

  return (
    <Avatar alt="Profile Image" src={link} sx={{ width: 200, height: 200 }} />
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
        <ImageAvatar src={data.profileImage} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        marginTop={2}
        marginBottom={2}
      >
        <VerifyStatus
          isUnderGraduate={data.isUnderGraduate}
          verificationImage={data.verificationImage}
        />
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
