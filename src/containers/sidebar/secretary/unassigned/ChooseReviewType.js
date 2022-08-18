import { useState } from "react";

import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DataGrid from "components/common/DataGrid";
import { useSetProposalReviewTypeMutation } from "api/data/proposal";
import LoadingCircle from "components/common/LoadingCircle";
import { useParams } from "react-router-dom";
import { EReviewType } from "config/enums";

function ChooseReviewType() {
  const [reviewType, setReviewType] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <FormControl>
        <FormLabel>Choose Reviewing Type</FormLabel>
        <RadioGroup
          row
          value={reviewType}
          onChange={(e) => setReviewType(e.target.value)}
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

  const onSubmit = () => setReviewType({ pid, type: EReviewType.exemption });

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

  return (
    <Box>
      <ReviewerDataGrid assigned={assigned} setAssigned={setAssigned} />
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        disabled={assigned.length < 1}
        onClick={() => alert("Completed")}
      >
        Finish
      </Button>
    </Box>
  );
}

function FullBoard() {
  const [assigned, setAssigned] = useState([]);

  return (
    <Box>
      <FormControl>
        <FormLabel>Reviewer Type</FormLabel>
        <RadioGroup row defaultValue="internal">
          <FormControlLabel
            value="internal"
            control={<Radio />}
            label="Internal"
          />
          <FormControlLabel
            value="external"
            control={<Radio />}
            label="External"
          />
        </RadioGroup>
      </FormControl>
      <ReviewerDataGrid assigned={assigned} setAssigned={setAssigned} />
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        disabled={assigned.length < 3}
        onClick={() => alert("Completed")}
      >
        Finish
      </Button>
    </Box>
  );
}

function ReviewerDataGrid({ assigned, setAssigned }) {
  const isAssigned = (id) => assigned.includes(id);

  const toggleAssign = (id) =>
    setAssigned((data) => {
      if (data.includes(id)) {
        return data.filter((i) => i !== id);
      } else {
        return [...data, id];
      }
    });

  return (
    <DataGrid
      sx={{ mt: 2 }}
      fields={["reviewer", "assigned", "btn"]}
      headerNames={["Reviewer", "Currently Assigned", "Status"]}
      rows={buildData(isAssigned, toggleAssign)}
    />
  );
}

const buildData = (isAssigned, toggleAssign) =>
  [
    {
      id: 0,
      reviewer: "reviewer 1",
      assigned: null,
    },
    {
      id: 1,
      reviewer: "reviewer 2",
      assigned: "proposal 1",
    },
    {
      id: 2,
      reviewer: "reviewer 3",
      assigned: "proposal 1, proposal 2",
    },
    {
      id: 3,
      reviewer: "reviewer 4",
      assigned: null,
    },
    {
      id: 4,
      reviewer: "reviewer 5",
      assigned: "proposal 3",
    },
    {
      id: 5,
      reviewer: "reviewer 6",
      assigned: "proposal 2",
    },
  ].map((row) => ({
    ...row,
    btn: (
      <AssignButton
        isAssigned={isAssigned(row.id)}
        toggleAssign={() => toggleAssign(row.id)}
      />
    ),
  }));

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
