import Dashboard from "containers/dashboard/Dashboard";

const data = [
  {
    value: "Unassigned Proposals",
    weight: 6,
    path: "/secretary/unassigned",
  },
  {
    value: "In Review Proposals",
    weight: 6,
    path: "/secretary/in-review",
  },
  { value: "Reviewed Proposals", weight: 6, path: "/secretary/reviewed" },
  { value: "Archived Proposals", weight: 6, path: "/secretary/archived" },
  { value: "Switch to Reviewer", weight: 6, path: "/reviewer" },
  {
    value: "Reviewer Requests",
    weight: 6,
    path: "/secretary/reviewer-requests",
  },
  { value: "User Management", weight: 12, path: "/secretary/user-management" },
];

export default function SecretaryDashboard() {
  return <Dashboard data={data} />;
}
