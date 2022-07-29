import { ControlContext } from "context";
import { useContext } from "react";

const useControl = () => useContext(ControlContext);

export default useControl;
