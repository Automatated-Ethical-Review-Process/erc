import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIcon from "@mui/icons-material/Assignment";

import SidebarLayout from "./SidebarLayout";

const sideBarItems = [
   {
      path: "/clerk/new-user-requests",
      icon: <PersonAddIcon />,
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
      path: "/clerk/current-proposals",
      icon: <AssignmentIcon />,
      text: "Current proposals",
   },
];

export default function ClerkLayout() {
   return <SidebarLayout role="clerk" sideBarItems={sideBarItems} />;
}
