import Dashboard from "containers/dashboard/Dashboard";
import Roles from "config/roles";
import useRoles from "hooks/useRoles";

const dataRest = [
   { value: "Pending Proposals", weight: 6, path: "/reviewer/pending" },
   {
      value: "Reviewing Proposals",
      weight: 6,
      path: "/reviewer/reviewing",
   },
   {
      value: "Reviewed Proposals",
      weight: 6,
      path: "/reviewer/reviewed",
   },
];

const dataIReviewer = {
   value: "Other Proposals",
   weight: 6,
   path: "/reviewer/other",
};

const dataApplicant = {
   value: "Switch to Applicant",
   weight: 6,
   path: "/applicant",
};

export default function ReviewerDashboard() {
   const roles = useRoles();

   const data = [...dataRest];

   if (roles.includes(Roles.i_reviewer)) {
      data.push(dataIReviewer);
   }
   if (roles.includes(Roles.applicant)) {
      data.push(dataApplicant);
   }

   if (data.length === 5) {
      dataApplicant.weight = 12;
   } else {
      dataApplicant.weight = 6;
   }

   return <Dashboard data={data} />;
}
