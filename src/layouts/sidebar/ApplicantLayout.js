import InboxIcon from "@mui/icons-material/MoveToInbox";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import SidebarLayout from "./SidebarLayout";
import Roles from "config/roles";

const sideBarItems = [
  {
    path: "/applicant/new-submission",
    icon: <NewReleasesIcon />,
    text: "New Submission",
  },
  {
    path: "/applicant/pending-submissions",
    icon: <PendingActionsIcon />,
    text: "Pending Submissions",
  },
  {
    path: "/applicant/ongoing-submissions",
    icon: <InboxIcon />,
    text: "Ongoing Submissions",
  },
  {
    path: "/applicant/old-submissions",
    icon: <UnfoldMoreIcon />,
    text: "Old Submissions",
  },
];

export default function ApplicantLayout() {
  return <SidebarLayout role={Roles.applicant} sideBarItems={sideBarItems} />;
}
