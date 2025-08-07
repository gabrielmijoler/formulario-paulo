import { useContext } from "react";

import { SnackbarContext } from "@/app/components/snackbarProvider";

const useSnackbar = () => {
  const snackContext = useContext(SnackbarContext);

  return snackContext;
};

export default useSnackbar;
