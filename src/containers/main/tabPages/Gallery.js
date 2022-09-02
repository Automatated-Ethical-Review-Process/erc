import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";

import img1 from "assets/GalleryImages/image1.png";
import img2 from "assets/GalleryImages/image2.png";
import img3 from "assets/GalleryImages/image3.png";
import img4 from "assets/GalleryImages/image4.png";
import img5 from "assets/GalleryImages/image5.png";
import img6 from "assets/GalleryImages/image6.png";
import img7 from "assets/GalleryImages/image7.png";
import img8 from "assets/GalleryImages/image8.png";
import img9 from "assets/GalleryImages/image9.jpg";

export default function StandardImageList({ cols }) {
  return (
    <Container>
      <ImageList
        sx={{ width: "100%", height: "90%" }}
        cols={cols}
        rowHeight={450}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

const itemData = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
  {
    img: img4,
  },
  {
    img: img5,
  },
  {
    img: img6,
  },
  {
    img: img7,
  },
  {
    img: img8,
  },
  {
    img: img9,
  },
];
