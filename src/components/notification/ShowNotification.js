import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import { useLocation, useNavigate } from "react-router-dom";

import {
   getNotification,
   getNotifications,
} from "services/data/notificationService";

import DataGrid from "components/common/DataGrid";
import NavigationBar from "components/NavigationBar";

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
               <StyledInputBase
                  placeholder="Search???"
                  inputProps={{ "aria-label": "search" }}
               />
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
   const notification = getNotification(id);

   if (!notification) {
      return "invalid notification id: " + id;
   }

   return (
      <Grid container spacing={2}>
         <Grid item xs={12}>
            <h1>{notification.title}</h1>
         </Grid>
         <Grid item xs={12} container direction="column" spacing={2}>
            <Grid item container>
               <Grid item xs={2} md={2}>
                  <Typography>Date :</Typography>
               </Grid>
               <Grid item xs={4} md={4}>
                  <Item>
                     <Typography>{notification.date}</Typography>
                  </Item>
               </Grid>
            </Grid>
            <Grid item container>
               <Grid item xs={2} md={2}>
                  <Typography>Time :</Typography>
               </Grid>
               <Grid item xs={4} md={4}>
                  <Item>
                     <Typography>{notification.time}</Typography>
                  </Item>
               </Grid>
            </Grid>
            <Grid item container>
               <Grid item xs={2} md={2}>
                  <Typography>From :</Typography>
               </Grid>
               <Grid item xs={4} md={4}>
                  <Item>
                     <Typography>{notification.from}</Typography>
                  </Item>
               </Grid>
            </Grid>
         </Grid>
         <Grid item xs={12}>
            <Divider sx={{ borderBottomWidth: 5 }} />
         </Grid>
         <Grid item xs={12} container sx={{ mt: 2 }}>
            <Typography>{notification.content}</Typography>
         </Grid>
      </Grid>
   );
}

function GetView() {
   const onclick = useNavigate();
   const location = useLocation();
   const id = location.state;

   if (id) {
      return <Notification id={id} />;
   }

   const notifications = getNotifications();

   return (
      <Grid container spacing={1}>
         <Grid item xs={12}>
            <SearchAppBar />
         </Grid>
         <Grid item xs={12}>
            <DataGrid
               fields={["title", "date", "time", "content", "from"]}
               headerNames={["Title", "Date", "Time", "Content", "From"]}
               rows={notifications}
               onRowClick={(row) => onclick("/notification", { state: row.id })}
            />
         </Grid>
      </Grid>
   );
}

export default function ShowNotification() {
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
