import { useSearchParams } from "react-router";
import { Stack } from "@mui/material";

import NotFoundText from "../_common/NotFoundText";
import SectionTitle from "../_common/SectionTitle";
import MediaCardItem from "../../_common/_tabs/_media/MediaCardItem";

function ViewPoiMedia({ mediaItems = [] }) {
  const [, setSearchParams] = useSearchParams();

  const handleEditPoiAsset = (asset) => {
    setSearchParams((prev) => {
      prev.set("mediaForm", "edit");
      prev.set("mediaId", asset.id);
      return prev;
    });
  };

  return (
    <div className="poi-media-section">
      <SectionTitle>{`Asset Media (${mediaItems.length})`} </SectionTitle>
      {mediaItems.length > 0 ? (
        <Stack spacing={1}>
          {mediaItems.map((asset) => (
            <MediaCardItem
              key={asset.id}
              asset={asset}
              onEdit={handleEditPoiAsset}
            />
          ))}
        </Stack>
      ) : (
        <NotFoundText>
          No media assets available for this Point of Interest.
        </NotFoundText>
      )}
    </div>
  );
}

export default ViewPoiMedia;
