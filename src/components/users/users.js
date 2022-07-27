import DataGrid from "components/common/DataGrid";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUsersQuery } from "api/data/user";

export default function Users({
  extraFields = {
    createdDate: "Registered",
  },
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data = [], isLoading } = useGetUsersQuery();

  const fields = {
    name: "Name",
    email: "Email",
    ...extraFields,
  };

  return (
    <DataGrid
      fields={Object.keys(fields)}
      headerNames={Object.values(fields)}
      rows={data}
      onRowClick={(row) => navigate(`${pathname}/${row.id}`)}
      loading={isLoading}
    />
  );
}
