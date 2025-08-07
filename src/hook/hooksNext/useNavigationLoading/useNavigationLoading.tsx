import { useContext } from "react";

import { NavigationLoadingContext } from "@/app/components/navigationLoadingProvider";

export default function useNavigationLoading() {
  return useContext(NavigationLoadingContext);
}
