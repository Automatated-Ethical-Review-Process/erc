import styled from "styled-components";

import Typography from "@mui/material/Typography";
import { useState, useEffect, useCallback } from "react";

import { useLocation } from "react-router-dom";

const FooterContainer = styled.footer`
   text-align: center;
   width: 100%;
   background: black;
   opacity: 0.7;
   position: absolute;
   ${(props) => props.bottom}: 0px;
`;

export default function Footer() {
   const text = `© ${new Date().getFullYear()} Department of Computer Science. All Rights Reserved`;

   const [bottom, setBottom] = useState("bottom");
   const { pathname } = useLocation();

   const setFooter = useCallback(() => {
      let ah = window.screen.availHeight;
      let sh = document.body.scrollHeight;
      ah < sh
         ? setBottom("null")
         : ah > 530 && ah < 601
         ? pathname !== "/"
            ? setBottom("bottom")
            : setBottom("null")
         : setBottom("bottom");
   }, [setBottom, pathname]);

   window.onresize = setFooter;
   document.onclick = setFooter;

   useEffect(() => {
      setFooter();
   }, [setFooter]);

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
