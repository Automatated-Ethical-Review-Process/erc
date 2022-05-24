import AButton from "./AButton";
import { useParams } from "react-router-dom";
import PdfViewer from "../PdfViewer";
import { ScopedCssBaseline } from "@mui/material";

const Test = () => {
   let { id } = useParams();
   return (
      <div>
         {/* {<AButton variant="contained" onClick={() => console.log("first")}>Click Me</AButton>
         <h1>{id}</h1>} */}
         <ScopedCssBaseline>
            <PdfViewer />
         </ScopedCssBaseline>
      </div>
   );
};

export default Test;
