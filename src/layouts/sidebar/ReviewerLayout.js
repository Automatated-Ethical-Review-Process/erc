import PendingIcon from "@mui/icons-material/Pending";
import PreviewIcon from "@mui/icons-material/Preview";
import GradingIcon from "@mui/icons-material/Grading";
import SummarizeIcon from "@mui/icons-material/Summarize";

import SidebarLayout from "./SidebarLayout";
import useRoles from "hooks/useRoles";
import Roles from "config/roles";

const sideBarItems = [
   {
      path: "/reviewer/pending",
      icon: <PendingIcon />,
      text: "Pending",
   },
   {
      path: "/reviewer/reviewing",
      icon: <PreviewIcon />,
      text: "In Review",
   },
   {
      path: "/reviewer/reviewed",
      icon: <GradingIcon />,
      text: "Reviewed",
   },
   {
      path: "/reviewer/other",
      icon: <SummarizeIcon />,
      text: "Other",
   },
];

export default function ReviewerLayout() {
   const roles = useRoles();
   let items = sideBarItems;

   if (!roles.includes(Roles.i_reviewer)) {
      items = [...sideBarItems];
      items.pop();
   }

   return <SidebarLayout role={Roles.reviewer} sideBarItems={items} />;
}
