import { useGetUsersByIdsMutation, useLazyGetUsersQuery } from "api/data/user";
import DataGrid from "components/common/DataGrid";
import Roles from "config/roles";
import useUser from "hooks/useUser";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Users({
  ids,
  loading,
  extraFields = {
    createdDate: "Registered",
  },
  others = [],
}) {
  const navigate = useNavigate();
  const { roles } = useUser();

  const [loadUsers, { data: users = [], isLoading: isUsersLoading }] =
    useLazyGetUsersQuery();
  const [loadUsersByIds, { data: usersByIds = [], isLoading: isIdsLoading }] =
    useGetUsersByIdsMutation();

  let data = [];
  if (users.length > 0) {
    data = users.filter(({ email }) => {
      if (
        email === "admin@gmail.com" ||
        (roles.includes(Roles.secretary) && email === "ercsecretary@gmail.com")
      ) {
        return false;
      }
      return true;
    });
  } else if (usersByIds.length > 0) {
    data = usersByIds;
  }

  if (others.length > 0 && data.length > 0) {
    data = data.map((i) => ({ ...others.find((j) => j.id === i.id), ...i }));
  }

  const isLoading = loading || isUsersLoading || isIdsLoading;

  const ref = useRef();

  useEffect(() => {
    if (ids) {
      if (ids.length > 0) {
        if (!ref.current) {
          ref.current = true;
          loadUsersByIds(ids);
        }
      }
    } else {
      loadUsers(undefined, true);
    }
  }, [ids, loadUsers, loadUsersByIds]);

  const fields = {
    name: "Name",
    email: "Email",
    ...extraFields,
  };

  return (
    <DataGrid
      fields={Object.keys(fields)}
      headerNames={Object.values(fields)}
      rows={data}
      onRowClick={(row) => navigate(String(row.id))}
      loading={isLoading}
    />
  );
}
