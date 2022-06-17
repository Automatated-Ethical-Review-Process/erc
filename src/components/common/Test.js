import Button from "./Button";
import { useParams } from "react-router-dom";
import PdfViewer from "../PdfViewer";
import DeclineComment from "./DeclineComment";

const Test = () => {
  let { id } = useParams();
  return (
    <div>
      {/* {<Button variant="contained"  onClick={() => console.log("first")}>Click Me</Button>} */}
      <DeclineComment />
    </div>
  );
};

export default Test;
