import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import SidebarLayout from "./SidebarLayout";

const sideBarItems = [
   { path: "/admin/users", icon: <AccountBoxIcon />, text: "Current Users" },
   { path: "/admin/add-user", icon: <PersonAddAltIcon />, text: "Add Users" },
];

export default function AdminLayout() {
   return <SidebarLayout role="admin" sideBarItems={sideBarItems} />;
}
