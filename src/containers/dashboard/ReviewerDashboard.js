import Dashboard from "containers/dashboard/Dashboard";

const data = [
   {
      value: "Pending Proposals",
      weight: 6,
      path: "/reviewer/pending",
   },
   {
      value: "Reviewing Proposals",
      weight: 6,
      path: "/reviewer/reviewing",
   },
   { value: "Reviewed Proposals", weight: 6, path: "/reviewer/reviewed" },
   { value: "Other Proposals", weight: 6, path: "/reviewer/other" },
   { value: "Switch to Applicant", weight: 12, path: "/applicant" },
];

export default function ReviewerDashboard() {
   return <Dashboard data={data} />;
}
