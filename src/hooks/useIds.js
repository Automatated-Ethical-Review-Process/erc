import { IdsContext } from "context";
import { useContext } from "react";

const useIds = () => useContext(IdsContext);

export default useIds;
