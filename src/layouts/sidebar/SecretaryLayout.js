import GradingIcon from "@mui/icons-material/Grading";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ThreePIcon from "@mui/icons-material/ThreeP";
import PreviewIcon from "@mui/icons-material/Preview";

import SidebarLayout from "./SidebarLayout";
import Roles from "config/roles";

const sideBarItems = [
  {
    path: "/secretary/unassigned",
    icon: <AssignmentLateIcon />,
    text: "Unassigned",
  },
  {
    path: "/secretary/assigned",
    icon: <PreviewIcon />,
    text: "Assigned",
  },
  {
    path: "/secretary/in-review",
    icon: <PageviewIcon />,
    text: "In Review",
  },
  {
    path: "/secretary/reviewed",
    icon: <GradingIcon />,
    text: "Reviewed",
  },
  {
    path: "/secretary/archived",
    icon: <ArchiveIcon />,
    text: "Archived",
  },
  {
    path: "/secretary/reviewer-requests",
    icon: <ThreePIcon />,
    text: "Reviewer requests",
  },
  {
    path: "/secretary/user-management",
    icon: <AccountBoxIcon />,
    text: "User Management",
  },
];

export default function SecretaryLayout() {
  return <SidebarLayout role={Roles.secretary} sideBarItems={sideBarItems} />;
}
