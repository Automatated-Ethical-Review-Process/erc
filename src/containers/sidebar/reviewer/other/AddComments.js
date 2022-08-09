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
import { useAddCommentMutation, useGetCommentQuery } from "api/data/comment";
import Form from "components/common/Form";
import LoadingCircle from "components/common/LoadingCircle";
import { RadioGroupController } from "components/controllers";
import { DecisionTypes } from "config/enums";
import useNotify from "hooks/useNotify";
import useUser from "hooks/useUser";
import { forwardRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const options = [
  { label: "Undecided", value: DecisionTypes.undecided },
  { label: "Approve", value: DecisionTypes.approved },
  { label: "Major Modification", value: DecisionTypes.major },
  { label: "Minor Modification", value: DecisionTypes.minor },
  { label: "Disapprove", value: DecisionTypes.disapproved },
];

export default function AddComments() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const { pid, vid } = useParams();
  const { id: rid } = useUser();

  const { notify } = useNotify();

  const {
    data: commentData,
    isLoading: isCommentLoading,
    isSuccess,
  } = useGetCommentQuery({ pid, vid, rid });

  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();

  const isLoading = isCommentLoading || isAdding;

  const handleClose = () => setData(null);

  const onSubmit = () => {
    addComment({ pid, vid, rid, body: data })
      .unwrap()
      .then(() => {
        notify("Comment added successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );
    handleClose();
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({ defaultValues: commentData });

  useEffect(() => {
    if (isSuccess && commentData) {
      reset({
        content: commentData.content,
        decisionType: commentData.decisionType,
      });
    }
  }, [isSuccess, commentData, reset]);

  const onData = (data) => {
    if (!data.content) {
      alert("Please enter a comment");
    } else {
      setData(data);
    }
  };

  return (
    <Container>
      <LoadingCircle isLoading={isLoading} />
      <Form onSubmit={handleSubmit(onData)} control={control}>
        <Typography variant="h5">Decision</Typography>
        <Box ml={3}>
          <RadioGroupController name="decisionType" options={options} />
        </Box>
        <Typography variant="h5" my={2}>
          Overall Comment
        </Typography>
        <Box ml={3}>
          <Controller
            name="content"
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
        {!commentData && (
          <Button
            type="submit"
            disabled={!isDirty}
            sx={{ my: 2 }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        )}
      </Form>
      <Dialog
        open={!!data}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Review Submission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to submit this comment?
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
