import { Button, Container, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

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

function Notification({ id }) {
  const navigate = useNavigate();
  const { data = {}, isLoading } = useGetNotificationQuery(id);

  return (
    <Grid container spacing={2}>
      <LoadingCircle isLoading={isLoading} />
      <Grid item xs={12}>
        <Typography variant="h4">{data.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <b>Date</b> : <i>{new Date(data.time).toLocaleDateString()}</i>
        </Typography>
        <Typography>
          <b>Time</b> : <i>{new Date(data.time).toLocaleTimeString()}</i>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ borderBottomWidth: 5 }} />
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <Typography>{data.content}</Typography>
          <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1, { replace: true })}
            >
              Back
            </Button>
            {data.type !== "/notification" && (
              <Button
                variant="contained"
                onClick={() =>
                  navigate(pathGenerator(data.contentId, data.type))
                }
              >
                Navigate
              </Button>
            )}
          </Stack>
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
