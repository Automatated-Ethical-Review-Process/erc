import DataGrid from "components/common/DataGrid";
import { getUsers } from "services/userService";
import { useNavigate, useLocation } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const users = getUsers();
  return (
    <DataGrid
      fields={["id", "name", "email", "address"]}
      headerNames={["ID", "Name", "Email", "Address"]}
      rows={users}
      onRowClick={(row) => navigate(`${pathname}/${row.id}`)}
    />
  );
}
