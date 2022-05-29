import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Typography } from "@mui/material";
import DataGrid from "components/common/DataGrid";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

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
                  placeholder="Search…"
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

const notifications = [
   {
      id: 1,
      title: "Notification 1",
      date: "2020/05/25",
      time: "20.30",
      content:
         "This is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is content",
      from: "a1@gmail.com",
   },
   {
      id: 2,
      title: "Notification 2",
      date: "2020/05/26",
      time: "21.24",
      content: "this is content",
      from: "a1@gmail.com",
   },
   {
      id: 3,
      title: "Notification 3",
      date: "2020/05/27",
      time: "10.36",
      content: "this is content",
      from: "a1@gmail.com",
   },
   {
      id: 4,
      title: "Notification 4",
      date: "2020/05/28",
      time: "02.50",
      content: "this is content",
      from: "a1@gmail.com",
   },
   {
      id: 5,
      title: "Notification 5",
      date: "2020/05/29",
      time: "06.30",
      content: "this is content",
      from: "a1@gmail.com",
   },
];

function Notification({ row }) {
   console.log(row);
   return (
      <Container>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <h1>{row.title}</h1>
               </Grid>
               <Grid item xs={12} container direction="column" spacing={2}>
                  <Grid item container>
                     <Grid item xs={2} md={2}>
                        <Typography>Date :</Typography>
                     </Grid>
                     <Grid item xs={4} md={4}>
                        <Item>
                           <Typography>{row.date}</Typography>
                        </Item>
                     </Grid>
                  </Grid>
                  <Grid item container>
                     <Grid item xs={2} md={2}>
                        <Typography>Time :</Typography>
                     </Grid>
                     <Grid item xs={4} md={4}>
                        <Item>
                           <Typography>{row.time}</Typography>
                        </Item>
                     </Grid>
                  </Grid>
                  <Grid item container>
                     <Grid item xs={2} md={2}>
                        <Typography>From :</Typography>
                     </Grid>
                     <Grid item xs={4} md={4}>
                        <Item>
                           <Typography>{row.from}</Typography>
                        </Item>
                     </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={12}>
                  <Divider sx={{ borderBottomWidth: 5 }} />
               </Grid>
               <Grid item xs={12} container sx={{ mt: 2 }}>
                  <Typography>{row.content}</Typography>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}

export default function BasicGrid() {
   const onclick = useNavigate();
   const location = useLocation();
   const row = location.state;

   if (row) {
      return <Notification row={row} />;
   }

   return (
      <Container sx={{ mx: "4" }}>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
               <Grid item xs={12}>
                  <SearchAppBar />
               </Grid>
               <Grid item xs={12}>
                  <DataGrid
                     fields={["title", "date", "time", "content", "from"]}
                     headerNames={["Title", "Date", "Time", "Content", "From"]}
                     rows={notifications}
                     onRowClick={(row) =>
                        onclick("/notification", { state: row })
                     }
                  />
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}
