import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

export default function Dashboard({ data }) {
   const navigate = useNavigate();

   return (
      <Grid container spacing={2} alignItems="center">
         {data.map((item, id) => (
            <Grid item xs={12} md={item.weight}>
               <Button
                  key={id}
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={() => navigate(item.path)}
               >
                  {item.value}
               </Button>
            </Grid>
         ))}
      </Grid>
   );
}
