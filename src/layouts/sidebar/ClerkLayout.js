import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import SidebarLayout from "./SidebarLayout";
import Roles from "config/roles";

const sideBarItems = [
   {
      path: "/clerk/new-user-requests",
      icon: <GroupAddIcon />,
      text: "New user requests",
   },
   {
      path: "/clerk/current-users",
      icon: <AccountBoxIcon />,
      text: "Current users",
   },
   {
      path: "/clerk/new-submissions",
      icon: <NewReleasesIcon />,
      text: "New submissions",
   },
   {
      path: "/clerk/add-reviewer",
      icon: <PersonAddIcon />,
      text: "Add reviewer",
   },
];

export default function ClerkLayout() {
   return <SidebarLayout role={Roles.clerk} sideBarItems={sideBarItems} />;
}
