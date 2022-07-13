import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const id = setTimeout(() => navigate("/", { replace: true }), 3000);
      return () => clearTimeout(id);
   }, [navigate]);

   return (
      <h4>
         {"Oops, page " + pathname + " not found, redirecting to home ..."}
      </h4>
   );
};

export default NotFound;
