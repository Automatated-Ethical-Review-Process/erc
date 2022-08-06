import { useGetUnverifiedUsersQuery } from "api/auth/api";
import Users from "components/users/users";

const NewUsers = () => {
  const { data = [], isLoading } = useGetUnverifiedUsersQuery();
  return (
    <Users
      ids={data.map((i) => i.id)}
      loading={isLoading}
      extraFields={{ status: "Status" }}
    />
  );
};

export default NewUsers;
