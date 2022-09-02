import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import manImg from "assets/man.jpg";
import womenImg from "assets/women.jpg";

function Member({ image, name, description }) {
  return (
    <Card sx={{ minHeight: 485 }}>
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-line" }}
        >
          {description.replaceAll(",", ",\n")}
        </Typography>
      </CardContent>
    </Card>
  );
}

function GridItem({ img, name, description }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Member image={img} name={name} description={description} />
    </Grid>
  );
}

export default function CommitteeMembers() {
  return (
    <Container>
      <Grid container spacing={2}>
        {itemData.map((item, key) => (
          <GridItem key={key} {...item} />
        ))}
      </Grid>
    </Container>
  );
}

const itemData = [
  {
    img: womenImg,
    name: "Prof. C. M. Wickramatilake (Chairperson)",
    description:
      "Professor in Biochemistry, Department of Biochemistry, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: womenImg,
    name: "Dr. S. S. Wickramasinghe (Member Secretary)",
    description:
      "Senior Lecturer & Consultant Microbiologist, Department of Microbiology, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: manImg,
    name: "Prof. P. V. De Silva (Vice Chairperson)",
    description:
      "Professor in Community Medicine, Department of Community Medicine, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: womenImg,
    name: "Dr. Gayani Liyanage (Alternate Member Secretary)",
    description:
      "Senior Lecturer in Pharmacology, Department of Pharmacology, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: womenImg,
    name: "Prof. Champica Bodinayake",
    description:
      "Professor in Medicine, Department of Medicine, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: womenImg,
    name: "Dr. S. A. C. Senadheera",
    description:
      "Senior Lecturer in Clinical Psychology, Clinical Psychologist, Department of Psychiatry, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: manImg,
    name: "Dr. Ajith Jayasekara",
    description:
      "Senior Lecturer in Psychiatry, Department of Psychiatry, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: manImg,
    name: "Dr. M. B. Samarawickrama",
    description:
      "Senior Lecturer, Department of Anatomy, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: manImg,
    name: "Dr. Lahiru Prabodha",
    description:
      "Senior Lecturer, Department of Anatomy, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: womenImg,
    name: "Ms. A. C. De Silva",
    description: "Attorney - at - law",
  },
  {
    img: manImg,
    name: "Dr. Niroshana Dahanayaka",
    description:
      "Senior Lecturer in Medicine, Department of Medicine, Faculty of Medicine, University of Ruhuna",
  },
  {
    img: manImg,
    name: "Dr. H. M. M. Herath",
    description:
      "Senior Lecturer & Honorary Consultant Physician, Department of Medicine, Faculty of Medicine, University of Ruhuna",
  },
];
