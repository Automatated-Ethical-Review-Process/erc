import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Chip } from "@mui/material";

import NavigationBar from "components/NavigationBar";
import RoleNavigationBar from "components/RoleNavigationBar";
import { getIdName } from "utils/ids";
import { IdsContext } from "context";

function simplify(ids, part) {
  return part.includes("-") ? getIdName(ids, part) : part;
}

export default function SidebarLayout({ role, sideBarItems }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState({});

  const paths = useMemo(
    () =>
      pathname
        .split("/")
        .filter((i) => i)
        .reduce(
          (data, curPath, index) => {
            data.push({
              name: simplify(ids, curPath),
              link: data[index].link + "/" + curPath,
            });
            return data;
          },
          [{ link: "" }]
        )
        .slice(1),
    [pathname, ids]
  );

  return (
    <NavigationBar role={role} title="ERC System" sideBarItems={sideBarItems}>
      <RoleNavigationBar role={role} />
      {paths && (
        <Breadcrumbs
          m={2}
          mb={1}
          maxItems={5}
          separator={<NavigateNextIcon sx={{ mb: 1 }} fontSize="small" />}
        >
          {paths.map((path, index) =>
            index < paths.length - 1 ? (
              <Chip
                sx={{ mb: 1 }}
                key={index}
                label={path.name}
                onClick={() => navigate(path.link)}
                icon={index === 0 ? <HomeIcon fontSize="small" /> : null}
              />
            ) : (
              <Chip
                sx={{ mb: 1 }}
                key={index}
                color="primary"
                label={path.name}
              />
            )
          )}
        </Breadcrumbs>
      )}
      <IdsContext.Provider value={setIds}>
        <Outlet />
      </IdsContext.Provider>
    </NavigationBar>
  );
}
