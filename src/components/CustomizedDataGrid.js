import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

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

const CustomizedDataGrid = ({ fields, headerNames, rows, onRowClick }) => {
  const [pageSize, setPageSize] = useState(9);
  const [windowSize, setWindowsize] = useState(window.screen.availWidth);
  const columns = [];

  window.onresize = function () {
    setWindowsize(window.screen.availWidth);
  };

  fields.map((value, index) =>
    columns.push(
      createColumnNode(value, headerNames[index], windowSize < 376 ? 0 : 1)
    )
  );

  return (
    <Container maxWidth="xl" sx={{ height: "80vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[9, 15, 20]}
        pagination
        disableSelectionOnClick
        onRowClick={(params) => onRowClick(params.row)}
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
