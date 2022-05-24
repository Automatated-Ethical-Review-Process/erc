import AButton from "./AButton";
import { useParams } from "react-router-dom";

const Test = () => {
   let { id } = useParams();
   return (
      <div>
         <AButton variant="contained" onClick={() => console.log("first")}>Click Me</AButton>
         <h1>{id}</h1>
      </div>
   );
};

export default Test;
