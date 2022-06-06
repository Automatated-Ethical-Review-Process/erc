import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

// const FooterContainer = styled.div`
//    text-align: center;
//    position: relative;
//    bottom: 0px;
//    width: 100%;
//    background: black;
//    opacity: 0.6;
// `;

const FooterContainer = styled.footer`
   text-align: center;
   width: 100%;
   background: black;
   opacity: 0.6;
   margin-top: -50px;
   position: absolute;
   bottom: 0px;
`;

export default function Footer() {
   const text = `© ${new Date().getFullYear()} Department of Computer Science. All Rights Reserved`;
   return (
      <FooterContainer>
         <Typography
            variant="title"
            display="block"
            sx={{
               mr: 2,
               p: 1,
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
   );
}
