import Roles from "config/roles";
import Dashboard from "containers/dashboard/Dashboard";
import useRoles from "hooks/useRoles";

const dataRest = [
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
];

const other = {
  value: "Old Submissions",
  weight: 12,
  path: "/applicant/old-submissions",
};

const reviewer = {
  value: "Switch to Reviewer",
  weight: 6,
  path: "/reviewer",
};

export default function ApplicantDashboard() {
  const roles = useRoles();

  const data = [...dataRest];

  data.push(other);

  if (roles.includes(Roles.reviewer)) {
    data.push(reviewer);
  }

  if (data.length === 4) {
    other.weight = 12;
  } else {
    other.weight = 6;
  }
  return <Dashboard data={data} />;
}
