import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const FooterContainer = styled.div`
   text-align: center;
   position: absolute;
   bottom: 0;
   width: 100%;
   min-height: 50px;
   background: black;
   opacity: 0.8 ;
`;

export default function Footer() {
   const text = "© 2022 Department of Computer Science.All Rights Reserved";
   return (
      <div>
         <FooterContainer>
            <Typography
               variant="title"
               display="block"
               sx={{
                  mr: 2,
                  p:1,
                  display: { xs: "block", md: "none" },
                  fontSize: 15,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
               }}
            >
               {text}
            </Typography>
            <Typography
               variant="title"
               sx={{
                  mr: 2,
                  lineHeight: 3.3,
                  display: { xs: "none", md: "block" },
                  fontSize: 15,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
               }}
            >
               {text}
            </Typography>
         </FooterContainer>
      </div>
   );
}
