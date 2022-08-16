import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useAddProposalMutation } from "api/data/proposal";
import { useGetMeQuery, useUserExistsMutation } from "api/data/user";
import { BasicForm } from "components/common/Form";
import LoadingCircle from "components/common/LoadingCircle";
import {
  FileInputController,
  ImageInputController,
  SelectController,
  TextFieldController,
} from "components/controllers";
import { ProposalType } from "config/enums";
import useNotify from "hooks/useNotify";
import { useState } from "react";
import { yEmptySchema } from "utils/yup";

const proposalTypes = [
  {
    label: "Human Research",
    value: ProposalType.human,
  },
  {
    label: "Animal Research",
    value: ProposalType.animal,
  },
];

function HiddenInput({ label, children }) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <FormControlLabel
        sx={{ ml: 0 }}
        control={
          <Switch color="primary" onChange={() => setChecked(!checked)} />
        }
        label={label}
        labelPlacement="start"
      />
      <br />
      {checked && children}
    </>
  );
}

export default function HorizontalLinearStepper() {
  const { data = {}, isLoading: isMeLoading } = useGetMeQuery();

  const [addProposal, { isLoading: isProposalLoading }] =
    useAddProposalMutation();
  const [checkEmails, { isLoading: isCheckingEmails }] =
    useUserExistsMutation();

  const isLoading = isMeLoading || isProposalLoading || isCheckingEmails;

  const { notify } = useNotify();

  const onAddProposal = ({ name, type, emails, ...data }) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify({ name, type }));
    formData.append("emails", JSON.stringify(emails));

    Object.entries(data).forEach(([key, value]) =>
      Array.from(value).forEach((v) => void formData.append(key, v))
    );

    addProposal(formData)
      .unwrap()
      .then(() => notify("Proposal added successfully", "success"))
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );
  };

  const onSubmit = ({ emails, ...data }) => {
    const parsedEmails = emails
      .split(",")
      .map((e) => e.trim())
      .filter((i) => i);

    checkEmails({ emails: parsedEmails })
      .unwrap()
      .then(({ unverified }) =>
        unverified.length === 0
          ? onAddProposal({ ...data, emails: parsedEmails })
          : notify(unverified.join(", ") + " emails are not verified", "error")
      )
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );
  };

  return (
    <Container maxWidth="md">
      <LoadingCircle isLoading={isLoading} />
      <Box sx={{ my: 3 }}>
        <BasicForm schema={yEmptySchema} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextFieldController
                name="name"
                label="Proposal Name"
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <SelectController
                name="type"
                label="Proposal Type"
                margin="none"
                options={proposalTypes}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldController
                name="emails"
                label="Co-Investigators"
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <FileInputController name="main" label="Upload the proposal" />
            </Grid>
            <Grid item xs={12}>
              <FileInputController
                name="supplementary"
                label="Upload the supplementary"
                multiple
              />
            </Grid>
            <Grid item xs={12}>
              <HiddenInput label="Has cover letter?">
                <FileInputController
                  name="coverLetter"
                  label="Attach cover letter"
                />
              </HiddenInput>
            </Grid>
            <Grid item xs={12}>
              <HiddenInput label="Has CV?">
                <FileInputController name="cv" label="Attach CV" />
              </HiddenInput>
            </Grid>
            <Grid item xs={12}>
              <HiddenInput label="Has training certificate?">
                <FileInputController
                  name="trainCertificate"
                  label="Attach certificates"
                  multiple
                />
              </HiddenInput>
            </Grid>
            <Grid item xs={12}>
              <HiddenInput label="Has any other ERC approved this project?">
                <FileInputController
                  name="arcApproved"
                  label="Attach approval letters"
                  multiple
                />
              </HiddenInput>
            </Grid>
            {!data.isUnderGraduate && (
              <Grid item xs={12}>
                <ImageInputController
                  name="paymentSlip"
                  label="Upload the payment slip"
                />
              </Grid>
            )}
            <Grid item xs={12} textAlign="right">
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </BasicForm>
      </Box>
    </Container>
  );
}
