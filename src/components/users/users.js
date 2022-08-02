import { useGetUsersByIdsMutation, useLazyGetUsersQuery } from "api/data/user";
import DataGrid from "components/common/DataGrid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Users({
  ids,
  loading,
  extraFields = {
    createdDate: "Registered",
  },
}) {
  const navigate = useNavigate();

  const [loadUsers, { data: users = [], isLoading: isUsersLoading }] =
    useLazyGetUsersQuery();
  const [loadUsersByIds, { data: usersByIds = [], isLoading: isIdsLoading }] =
    useGetUsersByIdsMutation();

  let data = [];
  if (users.length > 0) {
    data = users;
  } else if (usersByIds.length > 0) {
    data = usersByIds;
  }

  const isLoading = loading || isUsersLoading || isIdsLoading;

  useEffect(() => {
    if (ids) {
      if (ids.length > 0) {
        loadUsersByIds(ids);
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
