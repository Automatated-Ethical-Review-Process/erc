import Dashboard from "containers/dashboard/Dashboard";

const data = [
  {
    value: "New Submission",
    weight: 12,
    path: "/applicant/new-submission",
  },
  {
    value: "Pending Submissions",
    weight: 6,
    path: "/applicant/pending-submissions",
  },
  {
    value: "Ongoing Submissions",
    weight: 6,
    path: "/applicant/ongoing-submissions",
  },
  { value: "Old Submissions", weight: 12, path: "/applicant/old-submissions" },
];

export default function ApplicantDashboard() {
  return <Dashboard data={data} />;
}
