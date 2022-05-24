import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";

const CustomizedDataGrid = ({ fields, headerNames, onNodeCreate,rows }) => {
   const [pageSize, setPageSize] = useState(9);
   const [windowSize, setWindowsize] = useState(window.screen.availWidth);
   const columns = [];

   const { data } = useDemoData({
      dataSet: "Commodity",
      rowLength: 100,
      maxColumns: 12,
   });

   window.onresize = function () {
      setWindowsize(window.screen.availWidth);
   };

   fields.map((value, index) =>  columns.push(onNodeCreate(value, headerNames[index], windowSize < 376 ? 0 : 1)));

   return (
      <Container maxWidth="lg" sx={{ height: "80vh" }}>
         <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[9, 15, 20]}
            pagination
            disableSelectionOnClick
            onRowClick={(params) => {
               console.log(params);
            }}
            sx={{
               "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                  outline: 0,
               },
            }}
         />
      </Container>
   );
};

export default CustomizedDataGrid;
