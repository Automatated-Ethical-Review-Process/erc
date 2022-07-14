import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const useNotify = (persist = false) => {
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

   const notify = (text, variant = "default", options = {}) =>
      enqueueSnackbar(text, {
         variant,
         persist,
         autoHideDuration: 6000,
         action: (id) =>
            (options.persist || (options.persist === undefined && persist)) && (
               <Button
                  variant="text"
                  color="inherit"
                  onClick={() => closeSnackbar(id)}
               >
                  Dismiss
               </Button>
            ),
         ...options,
      });

   return { notify, closeNotify: closeSnackbar };
};

export default useNotify;
