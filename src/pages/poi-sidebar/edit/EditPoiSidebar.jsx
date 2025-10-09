import { useCallback } from "react";
import { useNavigate } from "react-router";

import useNavPaths from "@/hooks/useNavPaths";
import PoiSidebarHeader from "../_common/PoiSidebarHeader";
import PoiSidebar from "../_common/sidebar";
import PoiMainSection from "./_sections/PoiMainSection";
import PoiNavigationTabsSection from "./_sections/PoiNavigationTabsSection";

function EditPoiSidebar() {
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const handleClose = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  return (
    <PoiSidebar onClose={handleClose}>
      <PoiSidebarHeader
        title="Edit Point of Interest"
        onBack={() => {}}
        onClose={handleClose}
      />
      <PoiNavigationTabsSection />
      <PoiMainSection />
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
