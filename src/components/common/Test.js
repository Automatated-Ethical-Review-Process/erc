import AButton from "./AButton";
import { useParams } from "react-router-dom";
import PdfViewer from "../PdfViewer";


const Test = () => {
   let { id } = useParams();
   return (
      <div>
         {/* {<AButton variant="contained"  onClick={() => console.log("first")}>Click Me</AButton>} */}
         <PdfViewer/>
      </div>
   );
};

export default Test;
