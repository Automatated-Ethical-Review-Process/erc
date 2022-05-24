import React from "react";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

export default function MainLayout() {
   return (
      <div>
         <NavigationBar />
         <Outlet />
         <Footer />
      </div>
   );
}
