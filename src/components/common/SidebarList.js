import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { useNavigate, useLocation } from "react-router-dom";

import ListItem from "./ListItem";

export default function SidebarList({ items }) {
   const location = useLocation();
   const navigate = useNavigate();

   return (
      <>
         <Divider />
         <List>
            {items.map((item) => (
               <ListItem
                  key={item.path}
                  location={location}
                  navigate={navigate}
                  path={item.path}
                  icon={item.icon}
                  text={item.text}
               />
            ))}
         </List>
         <Divider />
      </>
   );
}
