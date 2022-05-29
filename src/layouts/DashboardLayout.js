import React from "react";

import NavigationBar from "components/dashboard/NavigationBar";
import Header from "components/dashboard/Header";
import Footer from "components/Footer";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
   return (
      <div>
         <NavigationBar />
         <Header />
         <Outlet />
         <Footer />
      </div>
   );
}
