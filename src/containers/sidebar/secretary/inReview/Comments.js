import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";

const data = [
  { id: 0, reviewer: "reviewer 1", comment: "comment 1" },
  { id: 1, reviewer: "reviewer 2", comment: "comment 2" },
  { id: 2, reviewer: "reviewer 3", comment: "comment 3" },
  { id: 3, reviewer: "reviewer 4", comment: "comment 4" },
];

export default function Proposals() {
  const navigate = useNavigate();

  return (
    <DataGrid
      fields={["reviewer", "comment"]}
      headerNames={["Reviewer", "Comment"]}
      rows={data}
      onRowClick={(row) => navigate(String(row.id))}
    />
  );
}
