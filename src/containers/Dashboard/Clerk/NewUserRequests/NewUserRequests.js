import CustomizedDataGrid from "../../../../components/CustomizedDataGrid";
import { getUsers } from "../../../../services/userService";

export default function NewUserRequests() {
   const users = getUsers();
   return (
      <>
         <CustomizedDataGrid
            fields={["id", "firstName", "lastName", "age"]}
            headerNames={["ID", "First Name", "Last Name", "Age"]}
            rows={users}
            onRowClick={(row) => console.log(row)}
         />
      </>
   );
}
