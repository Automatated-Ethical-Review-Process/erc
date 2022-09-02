import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import { useLocation, useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import NavigationBar from "components/NavigationBar";

import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectCurrentUser } from "api/auth/api";
import { darken, lighten } from "@mui/material/styles";

import authService from "services/auth";

import {
  useGetNotificationsQuery,
  useGetNotificationQuery,
  selectNotificationCount,
  selectNotitifcations,
  pathGenarator,
} from "api/notification/api";
import Loading from "components/common/Loading";
import { object } from "yup/lib/locale";
import { PrimaryButton } from "@react-pdf-viewer/core";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up('sm')]: {
    //   width: '100%',
    //   '&:focus': {
    //     width: '100%',
    //   },
    // },
  },
}));

export function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" />
        </Search>
      </Toolbar>
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Notification({ id }) {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetNotificationQuery(id);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>{data.title}</h1>
          </Grid>
          <Grid item xs={12} container direction="column" spacing={2}>
            <Grid item container>
              <Grid item xs={2} md={2}>
                <Typography>Date :</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Item>
                  <Typography>
                    {new Date(data.time).toLocaleString().split(",")[0]}
                  </Typography>
                </Item>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={2} md={2}>
                <Typography>Time :</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Item>
                  <Typography>
                    {new Date(data.time).toLocaleString().split(",")[1]}
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderBottomWidth: 5 }} />
          </Grid>
          <Grid item xs={12} container sx={{ mt: 2 }}>
            <Stack direction={"column"}>
              <Typography>{data.content}</Typography>
              {data.type !== "/notification" ? (
                <Typography
                  sx={{ color: "blue", cursor: "pointer" }}
                  onClick={() => {
                    navigate(pathGenarator(data.contentId, data.type));
                  }}
                >
                  {" "}
                  Click Here...{" "}
                </Typography>
              ) : null}
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
}

function getBgColor(color, isLight) {
  return isLight ? lighten(color, 0.6) : darken(color, 0.6);
}

function getHoverBgColor(color, isLight) {
  return isLight ? lighten(color, 0.5) : darken(color, 0.5);
}

function GetView() {
  const onclick = useNavigate();
  const location = useLocation();
  const id = location.state;
  const { error, isLoading } = useGetNotificationsQuery();
  const count = useSelector(selectNotificationCount);
  const data = useSelector(selectNotitifcations);
  console.log(count);
  //console.log(data);
  if (id) {
    return <Notification id={id} />;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <SearchAppBar />
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <DataGrid
            fields={["title", "time"]}
            headerNames={["Title", "Time"]}
            rows={data}
            sx={{
              "& .unseen-notifications": {
                bgcolor: (t) => getBgColor(t.palette.info.main, t.isLight),
                "&:hover": {
                  bgcolor: (t) =>
                    getHoverBgColor(t.palette.info.main, t.isLight),
                },
              },
            }}
            getRowClassName={({ row }) =>
              row.read ? undefined : "unseen-notifications"
            }
            onRowClick={(row) => onclick("/notification", { state: row.id })}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default function ShowNotification() {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  //console.log(isAuthenticated);
  //console.log(authService.access);
  return (
    <NavigationBar title="Notification">
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <GetView />
        </Box>
      </Container>
    </NavigationBar>
  );
}
