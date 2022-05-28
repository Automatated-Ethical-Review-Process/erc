import React from "react";

import DashboardNavigationBar from "components/DashboardNavigationBar";

import { Outlet } from "react-router-dom";
import DashboardHeader from "components/DashboardHeader";
export default function DashboardLayout() {
   return (
      <div>
         <DashboardNavigationBar />
         <DashboardHeader />
         <Outlet />
      </div>
   );
}
