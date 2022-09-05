import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  useAddProposalMutation,
  useHasActiveProposalQuery,
} from "api/data/proposal";
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
import { useEffect, useState } from "react";
import { yFile, yFiles, yObject, yString } from "utils/yup";

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

const schema = yObject({
  name: yString().required("Proposal name is required"),
  type: yString()
    .required("Proposal type is required")
    .oneOf([ProposalType.animal, ProposalType.human], "Invalid type"),
  emails: yString(),
  main: yFile.required("Proposal is required"),
  supplementary: yFiles.required("Supplementary is required"),
  coverLetter: yFile,
  cv: yFile,
  trainCertificate: yFiles,
  ercApproved: yFiles,
});

const paymentSlip = yFile.required("Payment slip is required");

export default function ApplicantNewSubmission() {
  const { data = {}, isLoading: isMeLoading } = useGetMeQuery();
  const { data: { validity } = {}, isLoading: isActiveLoading } =
    useHasActiveProposalQuery();

  const [addProposal, { isLoading: isProposalLoading }] =
    useAddProposalMutation();
  const [checkEmails, { isLoading: isCheckingEmails }] =
    useUserExistsMutation();

  const isLoading =
    isMeLoading || isActiveLoading || isProposalLoading || isCheckingEmails;

  const { notify } = useNotify();

  useEffect(() => {
    if (validity === undefined) return;
    if (!validity) {
      notify("You already have an active proposal", "error", { persist: true });
    }
  }, [validity, notify]);

  const onAddProposal = ({ name, type, ...data }) =>
    addProposal({ data: { name, type }, ...data })
      .unwrap()
      .then(() => notify("Proposal added successfully", "success"))
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );

  const onCheckEmails = (data) => {
    if (data.emails.length === 0) {
      onAddProposal(data);
    } else {
      checkEmails({ emails: data.emails })
        .unwrap()
        .then(({ unverified: uf }) =>
          uf.length === 0
            ? onAddProposal(data)
            : notify(
                `[${uf.join(", ")}] emails are not verified or exists`,
                "error"
              )
        )
        .catch(({ data }) =>
          notify(data?.message || "Something went wrong", "error")
        );
    }
  };

  const onSubmit = ({ emails, ...data }) => {
    const parsedEmails = emails
      .split(",")
      .map((e) => e.trim())
      .filter((i) => i);

    onCheckEmails({ emails: parsedEmails, ...data });
  };

  return (
    <Container maxWidth="md">
      <LoadingCircle isLoading={isLoading} />
      <Box sx={{ my: 3 }}>
        <BasicForm
          schema={data.isUnderGraduate ? schema : schema.shape({ paymentSlip })}
          onSubmit={onSubmit}
        >
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
                label="Emails of Co-Investigators"
                margin="none"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileInputController
                fullWidth
                name="main"
                label="Upload the proposal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileInputController
                fullWidth
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
              <HiddenInput label="Has training certificates?">
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
                  name="ercApproved"
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
              <Button type="submit" variant="contained" disabled={!validity}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </BasicForm>
      </Box>
    </Container>
  );
}
