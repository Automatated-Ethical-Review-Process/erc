import { Container, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import NavigationBar from "components/NavigationBar";

import { darken, lighten } from "@mui/material/styles";
import { useSelector } from "react-redux";

import {
  pathGenerator,
  selectNotifications,
  useGetNotificationQuery,
  useGetNotificationsQuery,
} from "api/notification/api";
import LoadingCircle from "components/common/LoadingCircle";
import routes from "config/routes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Notification({ id }) {
  const navigate = useNavigate();
  const { data = {}, isLoading } = useGetNotificationQuery(id);

  return (
    <Grid container spacing={2}>
      <LoadingCircle isLoading={isLoading} />
      <Grid item xs={12}>
        <Typography variant="h4">{data.title}</Typography>
      </Grid>
      <Grid item xs={12} container direction="column" spacing={2}>
        <Grid item container>
          <Grid item xs={2} md={2}>
            <Typography>Date :</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Typography>
                {new Date(data.time).toLocaleDateString()}
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
                {new Date(data.time).toLocaleTimeString()}
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
              onClick={() => navigate(pathGenerator(data.contentId, data.type))}
            >
              {" "}
              Click Here...{" "}
            </Typography>
          ) : null}
        </Stack>
      </Grid>
    </Grid>
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

  const { isLoading } = useGetNotificationsQuery();
  const data = useSelector(selectNotifications);

  if (id) {
    return <Notification id={id} />;
  }

  return (
    <DataGrid
      fields={["title", "time"]}
      headerNames={["Title", "Time"]}
      rows={data.map((i) => ({
        ...i,
        time: new Date(i.time).toLocaleString(),
      }))}
      sx={{
        "& .unseen-notifications": {
          bgcolor: (t) => getBgColor(t.palette.info.main, t.isLight),
          "&:hover": {
            bgcolor: (t) => getHoverBgColor(t.palette.info.main, t.isLight),
          },
        },
      }}
      getRowClassName={({ row }) =>
        row.read ? undefined : "unseen-notifications"
      }
      onRowClick={(row) => onclick(routes.notification, { state: row.id })}
      loading={isLoading}
    />
  );
}

export default function ShowNotification() {
  return (
    <NavigationBar title="Notification">
      <Container sx={{ mt: 3 }}>
        <GetView />
      </Container>
    </NavigationBar>
  );
}
