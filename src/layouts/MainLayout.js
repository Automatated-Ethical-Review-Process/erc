import Box from "@mui/material/Box";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

import { Outlet } from "react-router-dom";

export default function MainLayout() {
   return (
      <div>
         <NavigationBar />
         <Box sx={{ mb: 8 }}>
            <Outlet />
         </Box>
         <Footer />
      </div>
   );
}
