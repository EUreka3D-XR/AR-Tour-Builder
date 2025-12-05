import { Navigate } from "react-router-dom";
import { localeStorageAPI } from "@/utils/local-storage-utils";

function GuestRoute({ children }) {
  if (localeStorageAPI.auth.isAuthenticated()) {
    return <Navigate to="/projects" replace />;
  }

  return children;
}

export default GuestRoute;
