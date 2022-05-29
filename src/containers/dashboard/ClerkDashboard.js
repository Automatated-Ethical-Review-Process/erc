import Dashboard from "containers/dashboard/Dashboard";

const data = [
   {
      value: "New User Requests",
      weight: 6,
      path: "/clerk/new-user-requests",
   },
   { value: "Current Users", weight: 6, path: "/clerk/current-users" },
   { value: "New Submissions", weight: 6, path: "/clerk/new-submissions" },
   {
      value: "Current Proposals",
      weight: 6,
      path: "/clerk/current-proposals",
   },
];

export default function ClerkDashboard() {
   return <Dashboard data={data} />;
}
