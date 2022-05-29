import { Outlet } from "react-router-dom";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import DashboardNavigationBar from "components/DashboardNavigationBar";
import Footer from "components/Footer";

export default function DashboardLayout() {
   return (
      <div>
         <DashboardNavigationBar />
         <Container sx={{ mb: 10 }}>
            <Card sx={{ mt: 2, mb: 6 }}>
               <CardContent>
                  <Stack alignItems="center">
                     <Typography variant="h6" component="div">
                        University of Ruhuna
                     </Typography>
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Faculty of Medicine
                     </Typography>
                     <Typography variant="h5" component="div">
                        Ethical Reviewing System
                     </Typography>
                  </Stack>
               </CardContent>
            </Card>
            <Outlet />
         </Container>
         <Footer />
      </div>
   );
}
