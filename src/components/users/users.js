import DataGrid from "components/common/DataGrid";
import { getUsers } from "services/data/userService";
import { useNavigate, useLocation } from "react-router-dom";

export default function Users({
   extraFields = {
      createdDate: "Registered",
   },
}) {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const users = getUsers();

   const fields = {
      name: "Name",
      email: "Email",
      ...extraFields,
   };

   return (
      <DataGrid
         fields={Object.keys(fields)}
         headerNames={Object.values(fields)}
         rows={users}
         onRowClick={(row) => navigate(`${pathname}/${row.id}`)}
      />
   );
}
