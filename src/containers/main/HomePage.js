import CallIcon from "@mui/icons-material/Call";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Divider from "@mui/material/Divider";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CommitteMembers from "containers/main/tabPages/CommitteMembers";
import Gallery from "containers/main/tabPages/Gallery";
import About from "containers/main/tabPages/About";

import img1 from "assets/SliderImages/meeting1.jpg";
import img2 from "assets/SliderImages/meeting2.jpg";
import img3 from "assets/SliderImages/meeting3.jpg";
import img4 from "assets/SliderImages/meeting4.jpg";
import img5 from "assets/SliderImages/meeting5.jpg";
import img6 from "assets/SliderImages/meeting6.jpg";

function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <CallIcon /> Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The Administrative Officer <br /> Office: 0912234801/803 Ext:
                161 <br />
                Email :ethics@med.ruh.ac.lk
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <CallIcon /> Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Prof. C. M. Wickramatilake <br /> Chairperson <br /> Ethical
                Review Committee
                <br />
                Department of Biochemistry <br />
                Faculty of Medicine <br />
                University of Ruhuna
                <br />
                Office: 0912234801/803 Ext: 261
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <CallIcon /> Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dr. S. S. Wickramasinghe <br />
                Convenor/Secretary <br />
                Ethical Review Committee
                <br />
                Department of Microbiology <br />
                Faculty of Medicine <br />
                University of Ruhuna Office: 0912234801/803 Ext: 212
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="About" value="1" />
            <Tab label="Committee Members" value="2" />
            <Tab label="Galleray" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <About />
        </TabPanel>
        <TabPanel value="2">
          <CommitteMembers />
        </TabPanel>
        <TabPanel value="3">
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Gallery cols={1} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
            <Gallery cols={2} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <Gallery cols={3} />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: img1,
  },
  {
    imgPath: img2,
  },
  {
    imgPath: img3,
  },
  {
    imgPath: img4,
  },
  {
    imgPath: img5,
  },
  {
    imgPath: img6,
  },
];

export default function HomePage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Container>
      <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 20,
            pl: 4,
            bgcolor: "background.default",
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 450,
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                    />
                  </CardActionArea>
                </Card>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Box>

      <LabTabs />
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
      <ActionAreaCard />
    </Container>
  );
}
