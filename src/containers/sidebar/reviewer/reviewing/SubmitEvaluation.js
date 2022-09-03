import { forwardRef, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useAddEvaluationFormMutation } from "api/data/evaluationForm";
import { BasicForm } from "components/common/Form";
import LoadingCircle from "components/common/LoadingCircle";
import {
  FileInputController,
  RadioGroupController,
} from "components/controllers";
import { DecisionType } from "config/enums";
import useNotify from "hooks/useNotify";
import useUser from "hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";

import EvaluationForm from "assets/EvaluationForm/evaluation_form_for_reviewers.docx";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const options = [
  { label: "Approve", value: DecisionType.approved },
  { label: "Major Modification", value: DecisionType.major },
  { label: "Minor Modification", value: DecisionType.minor },
  { label: "Disapprove", value: DecisionType.disapproved },
];

const anchor = document.createElement("a");
document.body.appendChild(anchor);

export default function SubmitEvaluation() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const { pid, vid } = useParams();
  const { id: rid } = useUser();

  const handleClose = () => setData(null);
  const onData = (data) => {
    if (data.form) {
      setData(data);
    } else {
      alert("Please select the evaluation form");
    }
  };

  const { notify } = useNotify();
  const [addEvaluation, { isLoading }] = useAddEvaluationFormMutation();

  const onSubmit = () => {
    addEvaluation({ pid, vid, rid, data })
      .unwrap()
      .then(() => {
        notify("Evaluation Form send Successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );
    handleClose();
  };

  const onFormDownload = () => {
    anchor.href = EvaluationForm;
    anchor.download = "evaluation_form_for_reviewers.docx";
    anchor.click();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <LoadingCircle isLoading={isLoading} />
      <BasicForm onSubmit={onData}>
        <Typography variant="h5">Decision</Typography>
        <Box ml={3} mb={3}>
          <RadioGroupController name="type" options={options} />
        </Box>
        <Stack direction="row" spacing={3}>
          <FileInputController name="form" label="Upload evaluation form" />
          <Box>
            <Button variant="contained" type="submit" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Box>
        </Stack>
      </BasicForm>

      <Button sx={{ mt: 5 }} onClick={onFormDownload} color="warning">
        Download the Evaluation Form
      </Button>

      <Dialog
        open={!!data}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Review Submission</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to submit this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
