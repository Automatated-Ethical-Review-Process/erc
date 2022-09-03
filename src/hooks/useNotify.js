import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useMemo } from "react";

const useNotify = (persist = false) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const notify = useCallback(
    (text, variant = "default", options = {}) =>
      enqueueSnackbar(text, {
        variant,
        persist,
        autoHideDuration: 5000,
        action: (id) =>
          (options.onClick ||
            options.persist ||
            (options.persist === undefined && persist)) && (
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                closeSnackbar(id);
                options.onClick ? options.onClick() : void 0;
              }}
            >
              {options.label || "Dismiss"}
            </Button>
          ),
        ...options,
      }),
    [enqueueSnackbar, closeSnackbar, persist]
  );

  return useMemo(
    () => ({ notify, closeNotify: closeSnackbar }),
    [notify, closeSnackbar]
  );
};

export default useNotify;
