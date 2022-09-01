import { forwardRef, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import {
  useAddSecretaryCommentMutation,
  useGetLatestVersionQuery,
} from "api/data/version";
import { BasicForm } from "components/common/Form";
import LoadingCircle from "components/common/LoadingCircle";
import {
  RadioGroupController,
  TextAreaController,
} from "components/controllers";
import { VersionStatus } from "config/enums";
import useNotify from "hooks/useNotify";
import { useNavigate, useParams } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const options = [
  { label: "Approve", value: VersionStatus.granted },
  { label: "Major Modification", value: VersionStatus.major },
  { label: "Minor Modification", value: VersionStatus.minor },
  { label: "Disapprove", value: VersionStatus.rejected },
];

export default function NotifyAuthor() {
  const [addSecretaryComment, { isLoading }] = useAddSecretaryCommentMutation();

  const [data, setData] = useState(null);

  const handleClose = () => setData(null);

  const { pid } = useParams();

  const { notify } = useNotify();
  const navigate = useNavigate();

  const { data: latestVersionData = {}, isLoading: isLoadingLatest } =
    useGetLatestVersionQuery(pid);

  const isAllLoading = isLoadingLatest || isLoading;

  const handleSend = () => {
    addSecretaryComment({ pid, vid: latestVersionData.id, body: data })
      .unwrap()
      .then(() => {
        notify("Decision and Comment send Successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong!", "error")
      );
    handleClose();
  };

  const onData = (data) => {
    if (!data.message) {
      alert("Please Input a comment in comment box.");
    } else {
      setData(data);
    }
  };

  return (
    <Container>
      <LoadingCircle isLoading={isAllLoading} />
      <BasicForm onSubmit={onData}>
        <Typography variant="h5">Decision</Typography>
        <Box ml={3}>
          <RadioGroupController name="status" options={options} />
        </Box>
        <Typography variant="h5" my={2}>
          Overall Comment
        </Typography>
        <Box ml={3}>
          <TextAreaController
            name="message"
            placeholder="add overall comment for the proposal"
          />
        </Box>

        <Box my={2}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
            sx={{
              ml: 6,
            }}
          >
            Send
          </Button>
        </Box>
      </BasicForm>
      <Dialog
        open={!!data}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Send Decision"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to send this decision and Comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
