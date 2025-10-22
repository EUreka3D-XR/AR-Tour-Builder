import { useCallback } from "react";
import { useNavigate } from "react-router";

import useNavPaths from "@/hooks/useNavPaths";
import PoiSidebar from "../_common/sidebar";
import SidebarInner from "../_common/SidebarInner";

function EditPoiSidebar() {
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const handleClosePoi = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  return (
    <PoiSidebar onClose={handleClosePoi}>
      <SidebarInner onClose={handleClosePoi} />
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
