import React from "react";

import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

import tableData from "../db.json";

const Container = styled.div`
   height: 500px;
   width: 100%;
`;

const CustomizedDataGrid = () => {
    const rows = tableData.table.rows;
    const columns = tableData.table.columns;
   return (
      <Container>
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
