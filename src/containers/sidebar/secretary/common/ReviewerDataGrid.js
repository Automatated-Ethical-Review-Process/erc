import { Button } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";
import { useGetPreviousAssignedReviewersQuery } from "api/data/proposal";
import { useGetReviewersQuery } from "api/data/user";
import { useGetLatestVersionQuery } from "api/data/version";
import DataGrid from "components/common/DataGrid";
import { ReviewerStatus } from "config/enums";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function getBgColor(color, isLight) {
  return isLight ? lighten(color, 0.6) : darken(color, 0.6);
}

function getHoverBgColor(color, isLight) {
  return isLight ? lighten(color, 0.5) : darken(color, 0.5);
}

function ReviewerDataGrid({
  assigned,
  setAssigned,
  setPrevious,
  reviewerType = "ROLE_INTERNAL_REVIEWER",
  isLoading,
  isEditing,
}) {
  const { pid } = useParams();

  const { data = [], isLoading: isReviewersLoading } =
    useGetReviewersQuery(pid);
  const {
    data: previousReviewersRaw = [],
    isLoading: isPreviouslyReviewersLoading,
  } = useGetPreviousAssignedReviewersQuery(pid);
  const {
    data: version = {},
    isLoading: isLatestLoading,
    isSuccess,
  } = useGetLatestVersionQuery(pid);

  const [reviewAssigns, setReviewAssigns] = useState([]);

  useEffect(() => {
    if (
      isSuccess &&
      version.reviewAssigns &&
      version.reviewAssigns.length > 0
    ) {
      setReviewAssigns(version.reviewAssigns);
    }
  }, [isSuccess, version]);

  useEffect(() => {
    if (reviewAssigns && reviewAssigns.length > 0) {
      const tmp = reviewAssigns.map((i) => i.reviewer.id);
      setAssigned(tmp);
      setPrevious(tmp);
    }
  }, [reviewAssigns, setAssigned, setPrevious]);

  const previousReviewers = previousReviewersRaw.map((r) => r.reviewer_id);

  const isThisLoading =
    isReviewersLoading || isPreviouslyReviewersLoading || isLatestLoading;

  const isAssigned = (id) => assigned.includes(id);

  const toggleAssign = (id) =>
    setAssigned((data) => {
      if (data.includes(id)) {
        return data.filter((i) => i !== id);
      } else {
        return [...data, id];
      }
    });

  const completed = reviewAssigns
    .filter((i) => i.status === ReviewerStatus.completed)
    .map((i) => i.reviewer.id);

  const getColor = (id) => {
    for (const assign of reviewAssigns) {
      if (assign.reviewer.id === id) {
        if (assign.status === ReviewerStatus.confirm) {
          return "success";
        } else if (assign.status === ReviewerStatus.reject) {
          return "error";
        } else {
          return "primary";
        }
      }
    }
    return "primary";
  };

  const getStatus = (id) => {
    for (const assign of reviewAssigns) {
      if (assign.reviewer.id === id) {
        return assign.status;
      }
    }
    return "";
  };

  const rows = data
    .filter((r) => r.role === reviewerType)
    .sort((a, b) => {
      if (
        previousReviewers.includes(a.reviewerId) &&
        !previousReviewers.includes(b.reviewerId)
      ) {
        return -1;
      }
      if (
        !previousReviewers.includes(a.reviewerId) &&
        previousReviewers.includes(b.reviewerId)
      ) {
        return 1;
      }
      return 0;
    })
    .map((row, id) => ({
      ...row,
      id,
      status: getStatus(row.reviewerId),
      btn: (
        <AssignButton
          isAssigned={isAssigned(row.reviewerId)}
          toggleAssign={() => toggleAssign(row.reviewerId)}
          color={getColor(row.reviewerId)}
          disabled={completed.includes(row.reviewerId)}
        />
      ),
    }));

  const fields = ["name", "assignedProposal"];
  const headerNames = ["Reviewer", "Assigned Proposals"];

  if (isEditing) {
    fields.push("status");
    headerNames.push("States");
  }

  fields.push("btn");
  headerNames.push("Edit");

  return (
    <DataGrid
      sx={{
        mt: 2,
        "& .previously-assigned": {
          bgcolor: (t) => getBgColor(t.palette.info.main, t.isLight),
          "&:hover": {
            bgcolor: (t) => getHoverBgColor(t.palette.info.main, t.isLight),
          },
        },
      }}
      fields={fields}
      headerNames={headerNames}
      rows={rows}
      loading={!isLoading && isThisLoading}
      getRowClassName={({ row }) =>
        previousReviewers.includes(row.reviewerId) ? "previously-assigned" : ""
      }
    />
  );
}

const AssignButton = ({
  isAssigned,
  toggleAssign,
  color = "primary",
  disabled = false,
}) => {
  return (
    <Button
      variant={isAssigned ? "contained" : "outlined"}
      onClick={toggleAssign}
      color={color}
      disabled={disabled}
    >
      {isAssigned ? "Assigned" : "Assign"}
    </Button>
  );
};

export default ReviewerDataGrid;
