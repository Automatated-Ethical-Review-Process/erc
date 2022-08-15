import { useState, forwardRef } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Form from "components/common/Form";
import { RadioGroupController } from "components/controllers";
import { VersionStatus } from "config/enums";
import { Controller, useForm } from "react-hook-form";
import {
  useAddSecretaryCommentMutation,
  useGerLatestVersionQuery,
} from "api/data/version";
import { useParams, useNavigate } from "react-router-dom";
import useNotify from "hooks/useNotify";
import LoadingCircle from "components/common/LoadingCircle";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NotifyAuthor() {
  const [addSecretaryComment, { isLoading }] = useAddSecretaryCommentMutation();

  const [data, setData] = useState(null);
  const handleClose = () => {
    setData(null);
  };
  const { pid } = useParams();
  console.log(pid);
  const { notify } = useNotify();
  const navigate = useNavigate();
  const { data: latestVersionData = {}, isLoading: isLoadingLatest } =
    useGerLatestVersionQuery(pid);

  console.log(latestVersionData);
  const isAllLoading = isLoadingLatest || isLoading;
  const handleSend = () => {
    addSecretaryComment({ pid, vid: latestVersionData.id, body: data })
      .unwrap()
      .then(() => {
        notify("Decison and Comment send Successfully", "success");
        //  navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong!", "error")
      );
    handleClose();
  };

  const { control, handleSubmit } = useForm();
  const options = [
    { label: "Approve", value: VersionStatus.granted },
    { label: "Major Modification", value: VersionStatus.major },
    { label: "Minor Modification", value: VersionStatus.minor },
    { label: "Disapprove", value: VersionStatus.rejected },
  ];

  const onData = (data) => {
    console.log(data);
    if (!data.message) {
      alert("Please Input a comment in comment box.");
    } else {
      setData(data);
    }
  };
  return (
    <Container>
      <LoadingCircle isLoading={isAllLoading} />
      <Form onSubmit={handleSubmit(onData)} control={control}>
        <Typography variant="h5">Decision</Typography>
        <Box ml={3}>
          <RadioGroupController name="status" options={options} />
        </Box>
        <Typography variant="h5" my={2}>
          Overall Comment
        </Typography>
        {/* textarea for comments */}
        <Box ml={3}>
          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                minRows={10}
                placeholder="add overall comment for the proposal"
                style={{ width: 600 }}
              />
            )}
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
      </Form>
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
