import CustomizedDataGrid from "../../../../components/CustomizedDataGrid";
import tableData from "../../../../db.json";

class ColumnDefinition {
   constructor(field, headerName, flex) {
      this.field = field;
      this.headerName = headerName;
      this.headerAlign = "center";
      this.align = "center";
      this.width = 150;
      this.flex = flex;
   }
}

function createColumnNode(field, headerName, flex) {
   return new ColumnDefinition(field, headerName, flex);
}

export default function NewUserRequests() {
   return (
      <>
         <CustomizedDataGrid
            fields={["id", "firstName", "lastName", "age"]}
            headerNames={["ID", "First Name", "Last Name", "Age"]}
            onNodeCreate={createColumnNode}
            rows={tableData.table.rows}
         />
      </>
   );
}
