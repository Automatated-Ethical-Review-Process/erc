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

export default function PendingProposals() {
    console.log(tableData.perposals.rows)
   return (
      <>
         <CustomizedDataGrid
            fields={["id", "perposalName", "category", "deadline"]}
            headerNames={["Proposal ID", "Proposal Name", "Category", "Deadline"]}
            onNodeCreate={createColumnNode}
            rows={tableData.perposals.rows}
            
         />
      </>
   );
}
