import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { useSetProposalReviewTypeMutation } from "api/data/proposal";
import { useAssignAllReviewersMutation } from "api/data/review";
import { useGetLatestVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";
import { EReviewType } from "config/enums";
import useNotify from "hooks/useNotify";
import { useNavigate, useParams } from "react-router-dom";
import ReviewerDataGrid from "../common/ReviewerDataGrid";

function ChooseReviewType() {
  const [reviewType, setReviewType] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <FormControl>
        <FormLabel>Choose Reviewing Type</FormLabel>
        <RadioGroup
          row
          value={reviewType}
          onChange={({ target }) => setReviewType(target.value)}
        >
          <FormControlLabel
            value="exemption"
            control={<Radio />}
            label="Exemption from review"
          />
          <FormControlLabel
            value="expedited"
            control={<Radio />}
            label="Expedited review"
          />
          <FormControlLabel
            value="full-board"
            control={<Radio />}
            label="Full Board review"
          />
        </RadioGroup>
      </FormControl>
      <RenderContent reviewType={reviewType} />
    </Container>
  );
}

function RenderContent({ reviewType }) {
  switch (reviewType) {
    case "exemption":
      return <Exemption />;
    case "expedited":
      return <Expedited />;
    case "full-board":
      return <FullBoard />;
    default:
      return null;
  }
}

function Exemption() {
  const { pid } = useParams();
  const [setReviewType, { isLoading }] = useSetProposalReviewTypeMutation();

  const navigate = useNavigate();
  const { notify } = useNotify();

  const onSubmit = () =>
    setReviewType({ pid, type: EReviewType.exemption })
      .unwrap()
      .then(() => {
        notify("Proposal assigned successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );

  return (
    <Box position="fixed" bottom={20} right={20}>
      <LoadingCircle isLoading={isLoading} />
      <Button variant="contained" onClick={onSubmit}>
        Finish
      </Button>
    </Box>
  );
}

export function Expedited({ type = EReviewType.expedited }) {
  const [assigned, setAssigned] = useState([]);

  const { onSubmit, isLoading } = useAssignReviewers(assigned, type);

  return (
    <Box>
      <LoadingCircle isLoading={isLoading} />
      <ReviewerDataGrid assigned={assigned} setAssigned={setAssigned} />
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        disabled={assigned.length < 1}
        onClick={onSubmit}
      >
        {type ? "Finish" : "Update"}
      </Button>
    </Box>
  );
}

export function FullBoard({ type = EReviewType.fullBoard }) {
  const [assigned, setAssigned] = useState([]);

  const { onSubmit, isLoading } = useAssignReviewers(assigned, type);

  const [reviewerType, setReviewerType] = useState("ROLE_INTERNAL_REVIEWER");

  return (
    <Box>
      <LoadingCircle isLoading={isLoading} />
      <FormControl>
        <FormLabel>Reviewer Type</FormLabel>
        <RadioGroup
          onChange={({ target }) => setReviewerType(target.value)}
          row
          value={reviewerType}
        >
          <FormControlLabel
            value="ROLE_INTERNAL_REVIEWER"
            control={<Radio />}
            label="Internal"
          />
          <FormControlLabel
            value="ROLE_EXTERNAL_REVIEWER"
            control={<Radio />}
            label="External"
          />
        </RadioGroup>
      </FormControl>
      <ReviewerDataGrid
        assigned={assigned}
        setAssigned={setAssigned}
        reviewerType={reviewerType}
      />
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        disabled={assigned.length < 3}
        onClick={onSubmit}
      >
        {type ? "Finish" : "Update"}
      </Button>
    </Box>
  );
}

function useAssignReviewers(assigned, type) {
  const { pid } = useParams();

  const navigate = useNavigate();
  const { notify } = useNotify();

  const [setReviewType, { isLoading: isReviewTypeLoading }] =
    useSetProposalReviewTypeMutation();
  const [assignReviewers, { isLoading: isAssignReviewersLoading }] =
    useAssignAllReviewersMutation();
  const { data: { id: vid } = {}, isLoading: isLatestLoading } =
    useGetLatestVersionQuery(pid);

  const onAssign = () =>
    assignReviewers({ pid, vid, reviewers: assigned })
      .unwrap()
      .then(() => {
        notify(
          `Proposal ${type ? "assigned" : "updated"} successfully`,
          "success"
        );
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(
          data?.message || `Failed to ${type ? "assign" : "update"}`,
          "error"
        )
      );

  const onFinish = () =>
    setReviewType({ pid, type })
      .unwrap()
      .then(onAssign)
      .catch(({ data }) =>
        notify(data?.message || "Failed to set review type", "error")
      );

  const onSubmit = type ? onFinish : onAssign;

  const isLoading =
    isReviewTypeLoading || isAssignReviewersLoading || isLatestLoading;

  return { onSubmit, isLoading };
}

export default ChooseReviewType;
