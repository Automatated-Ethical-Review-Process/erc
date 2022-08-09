import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import { useGetAllReviewsQuery } from "api/data/version";

/* const data = [
  { id: 0, reviewer: "reviewer 1", decision: "approved", status: "reviewed" },
  {
    id: 1,
    reviewer: "reviewer 2",
    decision: "minor required",
    status: "reviewed",
  },
  {
    id: 2,
    reviewer: "reviewer 3",
    decision: "major required",
    status: "reviewed",
  },
  {
    id: 3,
    reviewer: "reviewer 4",
    decision: "disapproved",
    status: "reviewed",
  },
  { id: 4, reviewer: "reviewer 5", decision: "-", status: "reviewing" },
]; */

export default function Proposals() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetAllReviewsQuery();

  return (
    <DataGrid
      fields={["reviewerId", "decision"]}
      headerNames={["Reviewer", "Decision"]}
      rows={data}
      loading={isLoading}
      onRowClick={(row) => navigate(String(row.id))}
    />
  );
}
