import styled from "styled-components";

import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

const FooterContainer = styled.footer`
   text-align: center;
   width: 100%;
   background: black;
   opacity: 0.6;
   position: absolute;
   /* bottom: 0px; */
   ${(props) => props.bottom}: 0px;
`;
export default function Footer() {
   const text = `© ${new Date().getFullYear()} Department of Computer Science. All Rights Reserved`;
   const [bottom, setBottom] = useState("bottom");
   const location = useLocation();

   const setFooter = () => {
      let ah = window.screen.availHeight;
      let sh = document.body.scrollHeight;
      ah < sh
         ? setBottom("null")
         : ah > 530 && ah < 601
         ? setBottom("null")
         : setBottom("bottom");
      console.log(window.screen.availHeight < document.body.scrollHeight);
   };
   window.onresize = function () {
      setFooter();
   };
   document.onclick = function () {
      setFooter();
   };
   useEffect(() => {
      setFooter();
   }, [location]);
   return (
      <FooterContainer bottom={bottom}>
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
