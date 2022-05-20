import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";

import tableData from "../db.json";

const CustomizedDataGrid = (props) => {
   const [pageSize, setPageSize] = useState(9);

   const { data } = useDemoData({
      dataSet: "Commodity",
      rowLength: props.rows,
      maxColumns: props.columns,
   });

   //console.log(data)

   //const rows = tableData.table.rows;
   //const columns = tableData.table.columns;
   return (
      <Container maxWidth="lg" sx={{ height: "80vh" }}>
         <DataGrid
            {...data}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[9, 15, 20]}
            pagination
            disableSelectionOnClick
         />
      </Container>
   );
};

export default CustomizedDataGrid;
