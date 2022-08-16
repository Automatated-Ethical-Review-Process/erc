import * as React from "react";
import { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useLoginMutation } from "api/auth/api";
import authService from "services/auth";

import Image from "assets/meetings.jpg";
import Image1 from "assets/image1.png";
import Image2 from "assets/image2.png";
import Image3 from "assets/image3.png";
import Image4 from "assets/image4.png";
import Image5 from "assets/image5.png";
import Image6 from "assets/image6.png";
import Image7 from "assets/image7.png";
import Image8 from "assets/image8.png";
import Men from "assets/men.png";
import Woman from "assets/woman.png";

import { BasicForm } from "components/common/Form";
import {
  CheckboxController,
  PasswordFieldController,
  TextFieldController,
} from "components/controllers";
import { yEmail, yObject, yPassword } from "utils/yup";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export function ActionAreaCard(props) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          width={300}
          image={props.url}
          alt=""
        />
        <CardContent sx={props.minHeight}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function SubAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.category}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const schema = yObject({
  email: yEmail,
  password: yPassword,
});

export default function SignIn() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const [submitError, setSubmitError] = useState(window._msg);

  const onSubmit = ({ rememberMe, ...data }) => {
    authService.email = rememberMe ? data.email : null;
    setSubmitError(null);
    login(data)
      .unwrap()
      .then(() => navigate(state?.from ? state.from.pathname : "/"))
      .catch((err) =>
        setSubmitError(err.data?.message || "Something went wrong")
      );
  };

  const formView = (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <BasicForm schema={schema} defaultValues={null} onSubmit={onSubmit}>
          <TextFieldController
            name="email"
            label="Email Address"
            defaultValue={authService.email ?? ""}
            required
            autoComplete="email"
          />
          <PasswordFieldController
            name="password"
            label="Password"
            defaultValue=""
            required
            autoComplete="current-password"
          />
          <CheckboxController
            name="rememberMe"
            label="Remember me"
            defaultValue={authService.hasEmail}
          />
          {submitError && <Alert severity="error">{submitError}</Alert>}
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
                <Link to="/forgot-password">Forgot password?</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </BasicForm>
      </Box>
    </Container>
  );

  return (
    <Grid>
      <Grid
        container
        spacing={0}
        columns={{ xs: 4, md: 12 }}
        sx={{ mt: 1, pl: 2 }}
      >
        <Grid item xs={4} md={7}>
          <Container
            sx={{
              backgroundImage: `url(${Image})`,
              height: "100%",
              width: "100%",
              opacity: 1,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {/* {<Typography
                     align="justify"
                     sx={{ fontFamily: "monospace", letterSpacing: 2 }}
                  >
                     Ethical review Committee (ERC), Faculty of Medicine (FOM),
                     University of Ruhuna (UOR) reviews all types of research
                     proposals involving human and animal studies. It was
                     established in 1980. Membership of Federation of Ethical
                     Review Committees of Sri Lanka (FERCSL) was obtained by
                     ERC, FOM, UOR in 2017. The objective is to maintain
                     standards of practice in research, including protection of
                     human participants, animals and other living organisms,
                     while promoting high quality research which is ethically
                     and scientifically sound. The ERC is involved in the
                     capacity building in research ethics and clinical ethics
                     among the academics, students and the scientific community
                     in Southern Province.Ethics review committee, Faculty of
                     Medicine, University of Ruhuna underwent the international
                     recognition survey conducted by the Forum for Ethical
                     Review Committees in the Asian and Western Pacific (FERCAP)
                     region during 28th to 30th June 2018. It was an extensive
                     survey by a team of four surveyors (including two foreign
                     surveyors) and nine survey trainees. The committee awarded
                     the SIDCER (Strategic Initiative for Developing Capacity in
                     Ethical Review) recognition at the FERCAP conference, Chang
                     Gung Memorial Hospital,Taoyuan City, Taiwan 18th -21st
                     November 2018.
                  </Typography>} */}
          </Container>
        </Grid>
        <Grid item xs={4}>
          {formView}
        </Grid>
      </Grid>

      <Grid container>
        <Grid container item xs={12} md={12} sx={{ mt: 5, mx: 2 }}>
          <SubAppBar category="ABOUT" />
        </Grid>

        <Grid item xs={12} sx={{ mx: 10, my: 3 }}>
          <Typography align="justify" fontSize={20}>
            Ethical review Committee (ERC), Faculty of Medicine (FOM),
            University of Ruhuna (UOR) reviews all types of research proposals
            involving human and animal studies. It was established in 1980.
            Membership of Federation of Ethical Review Committees of Sri Lanka
            (FERCSL) was obtained by ERC, FOM, UOR in 2017. The objective is to
            maintain standards of practice in research, including protection of
            human participants, animals and other living organisms, while
            promoting high quality research which is ethically and
            scientifically sound. The ERC is involved in the capacity building
            in research ethics and clinical ethics among the academics, students
            and the scientific community in Southern Province.
            <br />
            <br />
            Ethics review committee, Faculty of Medicine, University of Ruhuna
            underwent the international recognition survey conducted by the
            Forum for Ethical Review Committees in the Asian and Western Pacific
            (FERCAP) region during 28th to 30th June 2018. It was an extensive
            survey by a team of four surveyors (including two foreign surveyors)
            and nine survey trainees. The committee awarded the SIDCER
            (Strategic Initiative for Developing Capacity in Ethical Review)
            recognition at the FERCAP conference, Chang Gung Memorial
            Hospital,Taoyuan City, Taiwan 18th -21st November 2018.
          </Typography>
        </Grid>

        <Grid container item xs={12} md={12} sx={{ mt: 5, mx: 2 }}>
          <SubAppBar category="GALLERY" />
        </Grid>

        <Container>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={6} sm={4} md={3}>
              <ActionAreaCard url={Image1} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ActionAreaCard url={Image2} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ActionAreaCard url={Image3} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ActionAreaCard url={Image4} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ActionAreaCard url={Image5} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={4} md={3}>
              <ActionAreaCard url={Image6} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ActionAreaCard url={Image7} minHeight={{ minHeight: 0 }} />
            </Grid>
            <Grid item xs={4} md={3}>
              <ActionAreaCard url={Image8} minHeight={{ minHeight: 0 }} />
            </Grid>
          </Grid>
        </Container>

        <Grid container item xs={12} md={12} sx={{ mt: 5, mx: 2 }}>
          <SubAppBar category="COMMITTEE MEMBERS" />
        </Grid>

        <Container>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Woman}
                name="Prof. C. M. Wickramatilake (Chairperson)"
                description="Professor in Biochemistry, Department of Biochemistry, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Woman}
                name="Dr. S. S. Wickramasinghe (Member Secretary)"
                description="Senior Lecturer & Consultant Microbiologist, Department of Microbiology, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Men}
                name="Prof. P. V. De Silva (Vice Chairperson)"
                description="Professor in Community Medicine, Department of Community Medicine, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Woman}
                name="Dr. Gayani Liyanage (Alternate Member Secretary)"
                description="Senior Lecturer in Pharmacology, Department of Pharmacology, Faculty of Medicine, University of Ruhuna

          "
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Woman}
                name="Prof. Champica Bodinayake"
                description="Professor in Medicine, Department of Medicine, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Woman}
                name="Dr. S. A. C. Senadheera"
                description="Senior Lecturer in Clinical Psychology, Clinical Psychologist, Department of Psychiatry, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Men}
                name="Dr. Ajith Jayasekara"
                description="Senior Lecturer in Psychiatry, Department of Psychiatry, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Men}
                name="Dr. M. B. Samarawickrama"
                description="Senior Lecturer, Department of Anatomy, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Men}
                name="Dr. Lahiru Prabodha"
                description="Senior Lecturer, Department of Anatomy, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Woman}
                name="Ms. A. C. De Silva"
                description="Attorney - at - law"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Men}
                name="Dr. Niroshana Dahanayaka"
                description="Senior Lecturer in Medicine, Department of Medicine, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ActionAreaCard
                minHeight={{ minHeight: 350 }}
                url={Men}
                name="Dr. H. M. M. Herath"
                description="Senior Lecturer & Honorary Consultant Physician, Department of Medicine, Faculty of Medicine, University of Ruhuna"
              />
            </Grid>
          </Grid>
        </Container>

        <Grid container item xs={12} md={12} sx={{ mt: 5, mx: 2 }}>
          <SubAppBar category="CONTACT" />
        </Grid>

        <Container>
          <Grid container spacing={4} sx={{ my: 2 }}>
            <Grid item xs={4} md={4}>
              <Typography>
                The Administrative Officer <br /> Office: 0912234801/803 Ext:
                161 <br />
                Email :ethics@med.ruh.ac.lk
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography>
                Prof. C. M. Wickramatilake <br /> Chairperson <br /> Ethical
                Review Committee
                <br />
                Department of Biochemistry <br />
                Faculty of Medicine <br />
                University of Ruhuna
                <br />
                Office: 0912234801/803 Ext: 261
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography>
                Dr. S. S. Wickramasinghe <br />
                Convenor/Secretary <br />
                Ethical Review Committee
                <br />
                Department of Microbiology <br />
                Faculty of Medicine <br />
                University of Ruhuna Office: 0912234801/803 Ext: 212
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
