import { useNavigate, useParams } from "react-router-dom";

import { Checkbox, Container } from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

import { useGetUserQuery } from "api/data/user";
import TextField from "components/common/TextField";
import LoadingCircle from "components/common/LoadingCircle";

export default function User({ children }) {
  const navigate = useNavigate();
  const { uid: userId } = useParams();

  const { data: user = {}, isLoading } = useGetUserQuery(userId);

  if (!user) {
    return "Invalid user id " + userId;
  }

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
    { label: "Created Date", value: user.createdDate ?? "" },
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
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={!!user.isUnderGraduate} />}
            label="is Undergraduate"
          />
        </Grid>
        <Grid item md={10}></Grid>
        {!children && (
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              onClick={() => navigate("undergraduate")}
              sx={{ width: 120 }}
            >
              Next
            </Button>
          </Grid>
        )}
      </Grid>
      {children}
    </Container>
  );
}
