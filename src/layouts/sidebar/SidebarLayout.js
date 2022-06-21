import React, { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumbs, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import NavigationBar from "components/NavigationBar";
import RoleNavigationBar from "components/RoleNavigationBar";

export default function SidebarLayout({ role, sideBarItems }) {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   const paths = useMemo(
      () =>
         pathname
            .split("/")
            .slice(1)
            .reduce(
               (data, curPath, index) => {
                  data.push({
                     name: curPath,
                     link: data[index].link + "/" + curPath,
                  });
                  return data;
               },
               [{ link: "" }]
            )
            .slice(1),
      [pathname]
   );

   return (
      <NavigationBar title="ERC System" sideBarItems={sideBarItems}>
         <RoleNavigationBar role={role} />
         {paths && (
            <Breadcrumbs
               m={2}
               separator={<NavigateNextIcon fontSize="small" />}
            >
               {paths.map((path, index) =>
                  index < paths.length - 1 ? (
                     <Chip
                        key={index}
                        label={path.name}
                        onClick={() => navigate(path.link)}
                        icon={
                           index === 0 ? <HomeIcon fontSize="small" /> : null
                        }
                     />
                  ) : (
                     <Chip key={index} color="primary" label={path.name} />
                  )
               )}
            </Breadcrumbs>
         )}
         <Outlet />
      </NavigationBar>
   );
}
