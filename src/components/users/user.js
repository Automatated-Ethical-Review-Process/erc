import { useParams } from "react-router-dom";

import { Button, Checkbox, Container } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

import { useGetUserQuery } from "api/data/user";
import LoadingCircle from "components/common/LoadingCircle";
import TextField from "components/common/TextField";
import useDownload from "hooks/useDownload";
import useIds from "hooks/useIds";
import { putIdName } from "utils/ids";

export default function User({ children }) {
  const { uid: userId } = useParams();
  const setIds = useIds();

  const {
    data: user = {},
    error,
    isLoading: isUserLoading,
  } = useGetUserQuery(userId);

  const verificationImage = user.verificationImage;

  const { download, isLoading: isFileLoading } = useDownload(verificationImage);

  if (error) {
    return "Invalid user id " + userId;
  }

  if (user.name) {
    putIdName(userId, user.name, setIds);
  }

  const isLoading = isUserLoading || isFileLoading;

  const data = [
    { label: "Name", value: user.name ?? "" },
    { label: "Address", value: user.address ?? "" },
    { label: "Phone Number", value: user.mobileNumber ?? "" },
    { label: "Land Number", value: user.landNumber ?? "" },
    { label: "Email", value: user.email ?? "" },
    { label: "Nic/Passport", value: user.nic ?? user.passport ?? "" },
    {
      label: "Educational Qualifications",
      value: user.educationalQualifications?.join("\n") ?? "",
      multiline: true,
      rows: 4,
    },
    { label: "Roles", value: user.roles?.join(", ") ?? "" },
  ];

  if (typeof user.isUnderGraduate === "boolean") {
    if (user.isUnderGraduate) {
      data.push(
        { label: "University", value: user.university ?? "" },
        { label: "Faculty", value: user.faculty ?? "" },
        { label: "Registration Number", value: user.registrationNumber ?? "" },
        { label: "Year", value: user.year ?? "" }
      );
    } else {
      data.push(
        { label: "Occupation", value: user.occupation ?? "" },
        { label: "Position", value: user.position ?? "" }
      );
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <LoadingCircle isLoading={isLoading} />
      <Grid container spacing={4}>
        {data.map((item, id) => (
          <Grid key={id} item xs={12}>
            <TextField {...item} readOnly />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox checked={!!user.isUnderGraduate} />}
            label="is Undergraduate"
          />
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          {verificationImage && (
            <Button onClick={download} variant="contained" color="warning">
              Download ID Photo
            </Button>
          )}
        </Grid>
        {children}
      </Grid>
    </Container>
  );
}
