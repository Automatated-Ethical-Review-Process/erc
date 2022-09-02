import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@emotion/react";

const About = () => {
  const theme = useTheme();
  return (
    <Container sx={{ bgcolor: theme.isLight ? "#f2f2f2" : "#211e1b" }}>
      <Typography
        align="justify"
        fontSize={18}
        sx={{ fontFamily: "Roboto", py: 2 }}
      >
        Ethical review Committee (ERC), Faculty of Medicine (FOM), University of
        Ruhuna (UOR) reviews all types of research proposals involving human and
        animal studies. It was established in 1980. Membership of Federation of
        Ethical Review Committees of Sri Lanka (FERCSL) was obtained by ERC,
        FOM, UOR in 2017. The objective is to maintain standards of practice in
        research, including protection of human participants, animals and other
        living organisms, while promoting high quality research which is
        ethically and scientifically sound. The ERC is involved in the capacity
        building in research ethics and clinical ethics among the academics,
        students and the scientific community in Southern Province.
        <br />
        <br />
        Ethics review committee, Faculty of Medicine, University of Ruhuna
        underwent the international recognition survey conducted by the Forum
        for Ethical Review Committees in the Asian and Western Pacific (FERCAP)
        region during 28th to 30th June 2018. It was an extensive survey by a
        team of four surveyors (including two foreign surveyors) and nine survey
        trainees. The committee awarded the SIDCER (Strategic Initiative for
        Developing Capacity in Ethical Review) recognition at the FERCAP
        conference, Chang Gung Memorial Hospital,Taoyuan City, Taiwan 18th -21st
        November 2018.
      </Typography>
    </Container>
  );
};

export default About;
