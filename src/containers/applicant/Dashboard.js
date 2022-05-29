import BaseDashboard from "containers/Dashboard";

const data = [
   {
      value: "New Submission",
      weight: 12,
      path: "/applicant/new-submission",
   },
   {
      value: "Current Submission",
      weight: 6,
      path: "/applicant/current-submission",
   },
   { value: "Old Submissions", weight: 6, path: "/applicant/old-submissions" },
];

export default function Dashboard() {
   return <BaseDashboard data={data} />;
}
