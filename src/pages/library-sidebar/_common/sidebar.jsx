import { useCallback } from "react";

import LibraryMediaModal from "@/components/media-modal/library-media/LibraryMediaModal";
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
      <LibraryMediaModal />
    </>
  );
}

export default AssetSidebar;
