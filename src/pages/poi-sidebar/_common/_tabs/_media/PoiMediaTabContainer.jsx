import { useParams, useSearchParams } from "react-router";

import { usePoiAssets, useReorderPoiAssets } from "@/services/assetsService";
import PoiMediaTab from "./PoiMediaTab";

function PoiMediaTabContainer() {
  const { poiId } = useParams();
  const [, setSearchParams] = useSearchParams();

  const { data, fetchState } = usePoiAssets(poiId);
  const { mutate: reorderAssets } = useReorderPoiAssets(poiId);

  const handleEditPoiAsset = (asset) => {
    setSearchParams((prev) => {
      prev.set("mediaForm", "edit");
      prev.set("mediaId", asset.id);
      return prev;
    });
  };

  const handleMove = (type, assets, fromIndex, toIndex) => {
    const reordered = [...assets];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    reorderAssets({ data: { [type]: reordered.map((a) => a.id) } });
  };

  if (fetchState.isLoading) {
    return <PoiMediaTab.Skeleton />;
  }

  return (
    <PoiMediaTab
      mediaAssets={data}
      onEdit={handleEditPoiAsset}
      onMove={handleMove}
    />
  );
}

export default PoiMediaTabContainer;
