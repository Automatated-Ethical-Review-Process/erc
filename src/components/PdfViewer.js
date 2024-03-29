import React from "react";

import {
  Worker,
  Viewer,
  ProgressBar,
  SpecialZoomLevel,
} from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Container } from "@mui/material";
import { useTheme } from "styled-components";

const PdfViewer = ({ link }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const theme = useTheme();

  const handlePageChange = (e) => {
    let page = e.currentPage > 0 ? e.currentPage : 0;
    localStorage.setItem("current-page", page);
  };

  const renderPage = (props) => (
    <>
      {props.scale}
      {props.canvasLayer.children}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      >
        <div
          style={{
            color: "rgba(0, 0, 0, 0.2)",
            fontSize: `${8 * props.scale}rem`,
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            transform: "rotate(-45deg)",
            userSelect: "none",
          }}
        >
          ERC SYSTEM
        </div>
      </div>
      {props.annotationLayer.children}
      <div style={{ userSelect: "none" }}>{props.textLayer.children}</div>
    </>
  );

  const initialPage = localStorage.getItem("current-page")
    ? parseInt(localStorage.getItem("current-page"))
    : 1;

  return (
    <Container sx={{ height: "83vh" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <Viewer
          fileUrl={link}
          plugins={[defaultLayoutPluginInstance]}
          initialPage={initialPage}
          onPageChange={handlePageChange}
          renderLoader={(number) => (
            <div style={{ width: "1000px" }}>
              <ProgressBar progress={Math.round(number)} />
            </div>
          )}
          renderPage={renderPage}
          defaultScale={SpecialZoomLevel.PageFit}
          theme={theme.palette.mode}
        />
      </Worker>
    </Container>
  );
};

export default PdfViewer;
