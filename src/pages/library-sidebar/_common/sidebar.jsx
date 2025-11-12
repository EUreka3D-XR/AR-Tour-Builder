import { useCallback } from "react";

import PoiMediaModalContainer from "@/components/media-modal/container";
import Sidebar from "@/components/sidebar/sidebar";
import useNavPaths from "@/hooks/useNavPaths";

function AssetSidebar({ children }) {
  const { routes, navigate } = useNavPaths();

  const handleCloseSidebar = useCallback(() => {
    navigate(routes.library.index);
  }, [navigate, routes]);

  return (
    <>
      <Sidebar onClose={handleCloseSidebar}>
        {typeof children === "function" &&
          children({
            onClose: handleCloseSidebar,
          })}
      </Sidebar>
      <PoiMediaModalContainer />
    </>
  );
}

export default AssetSidebar;
