import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import DataGrid from "components/common/DataGrid";

const other = {
   role: (
      <Select defaultValue={1}>
         <MenuItem value={1}>Subject expert</MenuItem>
         <MenuItem value={2}>Methodology expert</MenuItem>
         <MenuItem value={3}>Lay person</MenuItem>
      </Select>
   ),
   btn: (
      <Button variant="contained" onClick={() => alert("Assigned")}>
         Assign
      </Button>
   ),
};

const data = [
   { id: 0, reviewer: "reviewer 1", assigned: null, ...other },
   { id: 1, reviewer: "reviewer 2", assigned: "proposal 1", ...other },
   {
      id: 2,
      reviewer: "reviewer 3",
      assigned: "proposal 1, proposal 2",
      ...other,
   },
   { id: 3, reviewer: "reviewer 4", assigned: null, ...other },
   { id: 4, reviewer: "reviewer 5", assigned: "proposal 3", ...other },
   { id: 5, reviewer: "reviewer 6", assigned: "proposal 2", ...other },
];

function AssignReviewers() {
   return (
      <Container maxWidth="md">
         <FormControl>
            <FormLabel>Reviewer Type</FormLabel>
            <RadioGroup row defaultValue="internal">
               <FormControlLabel
                  value="internal"
                  control={<Radio />}
                  label="Internal"
               />
               <FormControlLabel
                  value="external"
                  control={<Radio />}
                  label="External"
               />
            </RadioGroup>
         </FormControl>
         <DataGrid
            sx={{ mt: 2 }}
            fields={["reviewer", "assigned", "role", "btn"]}
            headerNames={["Reviewer", "Currently Assigned", "Role", "Status"]}
            rows={data}
         />
         <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => alert("Completed")}
         >
            Finish
         </Button>
      </Container>
   );
}

export default AssignReviewers;
