import { useSelector } from "react-redux";

import { selectCurrentUser } from "api/auth/api";

const useUser = () => useSelector(selectCurrentUser);

export default useUser;
