import React, { useState, isValidElement } from "react";

import { DataGrid as BaseDataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

class ColumnDefinition {
  constructor(field, headerName, flex) {
    this.field = field;
    this.headerName = headerName;
    this.headerAlign = "center";
    this.align = "center";
    this.width = 150;
    this.flex = flex;
    this.renderCell = ({ value }) =>
      isValidElement(value) ? value : String(value);
  }
}

function createColumnNode(field, headerName, flex) {
  return new ColumnDefinition(field, headerName, flex);
}

const DataGrid = ({ fields, headerNames, rows, onRowClick, ...props }) => {
  const [pageSize, setPageSize] = useState(9);
  const [windowSize, setWindowSize] = useState(window.screen.availWidth);
  const columns = [];

  window.onresize = function () {
    setWindowSize(window.screen.availWidth);
  };

  fields.map((value, index) =>
    columns.push(
      createColumnNode(value, headerNames[index], windowSize < 376 ? 0 : 1)
    )
  );

  return (
    <Container maxWidth="xl">
      <BaseDataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[9, 15, 20]}
        disableSelectionOnClick
        onRowClick={(params) => onRowClick && onRowClick(params.row)}
        {...props}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
            outline: 0,
          },
          ".MuiDataGrid-columnHeader": {
            backgroundColor: (t) =>
              t.isLight ? t.palette.secondary.light : t.palette.secondary.dark,
          },
          ...props.sx,
        }}
      />
    </Container>
  );
};

export default DataGrid;
