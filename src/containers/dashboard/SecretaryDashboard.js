import Dashboard from "containers/dashboard/Dashboard";

const data = [
  {
    value: "Unassigned Proposals",
    weight: 6,
    path: "/secretary/unassigned",
  },
  {
    value: "Assigned Proposals",
    weight: 6,
    path: "/secretary/assigned",
  },
  {
    value: "In Review Proposals",
    weight: 6,
    path: "/secretary/in-review",
  },
  { value: "Reviewed Proposals", weight: 6, path: "/secretary/reviewed" },
  { value: "Archived Proposals", weight: 6, path: "/secretary/archived" },
  {
    value: "Reviewer Requests",
    weight: 6,
    path: "/secretary/reviewer-requests",
  },
  { value: "User Management", weight: 6, path: "/secretary/user-management" },
  { value: "Switch to Reviewer", weight: 6, path: "/reviewer" },
];

export default function SecretaryDashboard() {
  return <Dashboard data={data} />;
}
