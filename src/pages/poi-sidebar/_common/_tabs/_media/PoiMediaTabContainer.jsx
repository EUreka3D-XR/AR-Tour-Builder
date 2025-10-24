import { useParams, useSearchParams } from "react-router";

import { usePoiAssets } from "@/services/assetsService";
import PoiMediaTab from "./PoiMediaTab";

function PoiMediaTabContainer() {
  const { projectId, tourId, poiId } = useParams();

  const [, setSearchParams] = useSearchParams();

  const { data, fetchState } = usePoiAssets(projectId, tourId, poiId);

  const handleEditPoiAsset = (asset) => {
    setSearchParams((prev) => {
      prev.set("mediaForm", "edit");
      prev.set("mediaId", asset.id);
      return prev;
    });
  };

  if (fetchState.isLoading) {
    return <PoiMediaTab.Skeleton />;
  }

  return <PoiMediaTab mediaAssets={data} onEdit={handleEditPoiAsset} />;
}

export default PoiMediaTabContainer;
