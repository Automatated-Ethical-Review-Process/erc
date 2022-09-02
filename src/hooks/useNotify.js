import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const useNotify = (persist = false) => {
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
   const navigate = useNavigate();
   const notify = (text, variant = "default", type = "default", options = {}) =>
      enqueueSnackbar(text, {
         variant,
         persist,
         autoHideDuration: 5000,
         action: (id) =>
            (options.persist || (options.persist === undefined && persist)) && (
               <Button
                  variant="text"
                  color="inherit"
                  onClick={() => {
                     console.log("first");
                     closeSnackbar(id);
                     if (type === "notification") {
                        navigate("/notification");
                     }
                  }}
               >
                  Dismiss
               </Button>
            ),
         ...options,
      });

   return { notify, closeNotify: closeSnackbar };
};

export default useNotify;
