import Button from "./Button";
import { useParams } from "react-router-dom";
import PdfViewer from "../PdfViewer";
import Loading from "./Loading";

const Test = () => {
   let { id } = useParams();
   return <Loading value={true} />;
};

export default Test;
