import { useCallback } from "react";
import { useSearchParams } from "react-router";

import Sidebar from "@/components/sidebar/sidebar";
import useNavPaths from "@/hooks/useNavPaths";

function PoiSidebar({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { routes, navigate } = useNavPaths();

  const isInsideCreateAssetForm =
    Boolean(searchParams.get("mediaForm")) && !searchParams.get("mediaId");
  const isInsideEditAssetForm =
    Boolean(searchParams.get("mediaForm")) &&
    Boolean(searchParams.get("mediaId"));

  const handleCloseSidebar = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  const handleCloseAsset = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("mediaForm");
      prev.delete("mediaId");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <Sidebar onClose={handleCloseSidebar}>
      {typeof children === "function" &&
        children({
          showCreateAssetForm: isInsideCreateAssetForm,
          showEditAssetForm: isInsideEditAssetForm,
          showPoiForm: !isInsideCreateAssetForm && !isInsideEditAssetForm,
          onCloseAsset: handleCloseAsset,
          onClosePoi: handleCloseSidebar,
        })}
    </Sidebar>
  );
}

export default PoiSidebar;
