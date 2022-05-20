import React from "react";

import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

import tableData from "../db.json";

const CustomizedDataGrid = () => {
    const rows = tableData.table.rows;
    const columns = tableData.table.columns;
   return (
      <Container maxWidth="md" sx={{height:'80vh'}}>
         <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableSelectionOnClick
         />
      </Container>
   );
};

export default CustomizedDataGrid;
