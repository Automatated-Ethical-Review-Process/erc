import Button from "./Button";
import { useParams } from "react-router-dom";
import PdfViewer from "../PdfViewer";

const Test = () => {
   let { id } = useParams();
   return (
      <div>
         {/* {<Button variant="contained"  onClick={() => console.log("first")}>Click Me</Button>} */}
         <PdfViewer />
      </div>
   );
};

export default Test;
