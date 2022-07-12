import InboxIcon from "@mui/icons-material/MoveToInbox";
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
      path: "/applicant/current-submissions",
      icon: <InboxIcon />,
      text: "Current Submissions",
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
