import Dashboard from "containers/dashboard/Dashboard";

const data = [
   {
      value: "Current Users",
      weight: 6,
      path: "/admin/users",
   },
   { value: "Add User", weight: 6, path: "/admin/add-user" },
];

export default function AdminDashboard() {
   return <Dashboard data={data} />;
}
