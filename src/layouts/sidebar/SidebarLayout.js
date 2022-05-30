import React from "react";
import { Outlet } from "react-router-dom";

import NavigationBar from "components/NavigationBar";
import RoleNavigationBar from "components/RoleNavigationBar";

export default function SidebarLayout({ role, sideBarItems }) {
   return (
      <NavigationBar title="ERC System" sideBarItems={sideBarItems}>
         <RoleNavigationBar role={role} />
         <Outlet />
      </NavigationBar>
   );
}
