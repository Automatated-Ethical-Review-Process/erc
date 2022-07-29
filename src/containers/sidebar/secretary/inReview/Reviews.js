import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";

const data = [
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
];

export default function Proposals() {
  const navigate = useNavigate();

  return (
    <DataGrid
      fields={["reviewer", "decision", "status"]}
      headerNames={["Reviewer", "Decision", "Status"]}
      rows={data}
      onRowClick={(row) => navigate(String(row.id))}
    />
  );
}
