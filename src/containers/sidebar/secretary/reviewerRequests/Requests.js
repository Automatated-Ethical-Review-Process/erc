import { useGetAppealsQuery } from "api/data/appeal";
import DataGrid from "components/common/DataGrid";
import { useNavigate } from "react-router-dom";

function ReviewerRequests() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetAppealsQuery();

  return (
    <DataGrid
      fields={["id", "name", "status"]}
      headerNames={["ID", "Name", "Status"]}
      rows={data}
      onRowClick={(row) => navigate(String(row.id))}
      loading={isLoading}
    />
  );
}

export default ReviewerRequests;
