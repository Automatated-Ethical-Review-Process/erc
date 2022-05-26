import CustomizedDataGrid from "../../../../components/CustomizedDataGrid";
import tableData from "../../../../db.json";

export default function NewUserRequests() {
   return (
      <>
         <CustomizedDataGrid
            fields={["id", "firstName", "lastName", "age"]}
            headerNames={["ID", "First Name", "Last Name", "Age"]}
            rows={tableData.users.rows}
            onRowClick={(row) => console.log(row)}
         />
      </>
   );
}
