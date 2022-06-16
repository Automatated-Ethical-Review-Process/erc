import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import BaseUser from "components/users/user";

export default function UserDetails() {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   return (
      <BaseUser>
         <Button
            variant="contained"
            onClick={() => navigate(`${pathname}/update`)}
            sx={{ width: 120 }}
         >
            Update
         </Button>
      </BaseUser>
   );
}
