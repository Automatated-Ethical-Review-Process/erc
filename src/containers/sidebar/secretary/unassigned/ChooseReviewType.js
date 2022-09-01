import { useCallback, useState } from "react";

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
import { useGetReviewersQuery } from "api/data/user";
import { useGetLatestVersionQuery } from "api/data/version";
import DataGrid from "components/common/DataGrid";
import LoadingCircle from "components/common/LoadingCircle";
import { EReviewType } from "config/enums";
import useNotify from "hooks/useNotify";
import { useNavigate, useParams } from "react-router-dom";

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

function Expedited() {
  const [assigned, setAssigned] = useState([]);

  const { pid } = useParams();

  const navigate = useNavigate();
  const { notify } = useNotify();

  const [setReviewType, { isLoading: isReviewTypeLoading }] =
    useSetProposalReviewTypeMutation();
  const [assignReviewers, { isLoading: isAssignReviewersLoading }] =
    useAssignAllReviewersMutation();
  const { data: { id: vid } = {}, isLoading: isLatestLoading } =
    useGetLatestVersionQuery(pid);

  const assign = () =>
    assignReviewers({ pid, vid, reviewers: assigned })
      .unwrap()
      .then(() => {
        notify("Proposal assigned successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Failed to assign", "error")
      );

  const onFinish = () =>
    setReviewType({ pid, type: EReviewType.expedited })
      .unwrap()
      .then(assign)
      .catch(({ data }) =>
        notify(data?.message || "Failed to set review type", "error")
      );

  const isLoading =
    isReviewTypeLoading || isAssignReviewersLoading || isLatestLoading;

  const filter = useCallback((r) => r.role === "ROLE_INTERNAL_REVIEWER", []);

  return (
    <Box>
      <LoadingCircle isLoading={isLoading} />
      <ReviewerDataGrid
        assigned={assigned}
        setAssigned={setAssigned}
        filter={filter}
      />
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        disabled={assigned.length < 1}
        onClick={onFinish}
      >
        Finish
      </Button>
    </Box>
  );
}

function FullBoard() {
  const [assigned, setAssigned] = useState([]);

  const navigate = useNavigate();
  const { notify } = useNotify();

  const { pid } = useParams();

  const [setReviewType, { isLoading: isReviewTypeLoading }] =
    useSetProposalReviewTypeMutation();
  const [assignReviewers, { isLoading: isAssignReviewersLoading }] =
    useAssignAllReviewersMutation();
  const { data: { id: vid } = {}, isLoading: isLatestLoading } =
    useGetLatestVersionQuery(pid);

  const assign = () =>
    assignReviewers({ pid, vid, reviewers: assigned })
      .unwrap()
      .then(() => {
        notify("Proposal assigned successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Failed to assign", "error")
      );

  const onFinish = () =>
    setReviewType({ pid, type: EReviewType.fullBoard })
      .unwrap()
      .then(assign)
      .catch(({ data }) =>
        notify(data?.message || "Failed to set review type", "error")
      );

  const isLoading =
    isReviewTypeLoading || isAssignReviewersLoading || isLatestLoading;

  const [reviewerType, setReviewerType] = useState("ROLE_INTERNAL_REVIEWER");

  const filter = useCallback((r) => r.role === reviewerType, [reviewerType]);

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
        filter={filter}
      />
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        disabled={assigned.length < 3}
        onClick={onFinish}
      >
        Finish
      </Button>
    </Box>
  );
}

function ReviewerDataGrid({ assigned, setAssigned, filter = () => true }) {
  const { data = [], isLoading } = useGetReviewersQuery();

  const isAssigned = (id) => assigned.includes(id);

  const toggleAssign = (id) =>
    setAssigned((data) => {
      if (data.includes(id)) {
        return data.filter((i) => i !== id);
      } else {
        return [...data, id];
      }
    });

  const rows = data.filter(filter).map((row, id) => ({
    ...row,
    id,
    btn: (
      <AssignButton
        isAssigned={isAssigned(row.reviewerId)}
        toggleAssign={() => toggleAssign(row.reviewerId)}
      />
    ),
  }));

  return (
    <DataGrid
      sx={{ mt: 2 }}
      fields={["name", "assignedProposal", "role", "btn"]}
      headerNames={["Reviewer", "Assigned Proposals", "Role", "Status"]}
      rows={rows}
      loading={isLoading}
    />
  );
}

const AssignButton = ({ isAssigned, toggleAssign }) => {
  return (
    <Button
      variant={isAssigned ? "contained" : "outlined"}
      onClick={toggleAssign}
    >
      {isAssigned ? "Assigned" : "Assign"}
    </Button>
  );
};

export default ChooseReviewType;
