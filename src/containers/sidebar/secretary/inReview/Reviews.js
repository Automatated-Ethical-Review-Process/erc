import { useNavigate, useParams } from "react-router-dom";

import { useGetAllReviewsQuery } from "api/data/version";
import DataGrid from "components/common/DataGrid";

export default function Proposals() {
  const navigate = useNavigate();
  const { pid, vid } = useParams();
  const { data = [], isLoading } = useGetAllReviewsQuery({ pid, vid });

  return (
    <DataGrid
      fields={["reviewerName", "decision"]}
      headerNames={["Reviewer", "Decision"]}
      rows={data}
      loading={isLoading}
      onRowClick={(row) => navigate(String(row.reviewerId))}
    />
  );
}
