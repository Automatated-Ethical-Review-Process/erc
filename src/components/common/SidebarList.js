import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { useNavigate, useLocation } from "react-router-dom";

import ListItem from "./ListItem";

export default function SidebarList({ items }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Divider />
      <List>
        {items.map((item, id) => (
          <ListItem
            key={id}
            pathname={pathname}
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
