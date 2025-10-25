import { useParams, useSearchParams } from "react-router";

import { usePoiAsset } from "@/services/assetsService";
import CenteredArea from "../centered/Centered";
import ErrorArea from "../error/ErrorArea";
import DisplayLoading from "../media-display/_common/DisplayLoading";
import MediaModal from "./layout";
import MediaModalDisplay from "./MediaModalDisplay";

function PoiMediaModalContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const assetId = searchParams.get("displayMedia");

  const { projectId, tourId, poiId } = useParams();

  const { data, fetchState } = usePoiAsset(projectId, tourId, poiId, assetId);

  const isOpen = !!assetId;
  const handleClose = () => {
    searchParams.delete("displayMedia");
    setSearchParams(searchParams);
  };

  return (
    <MediaModal isOpen={isOpen} onClose={handleClose}>
      {fetchState.isLoading && <DisplayLoading />}
      {fetchState.isError && (
        <CenteredArea>
          <ErrorArea />
        </CenteredArea>
      )}
      {fetchState.isSuccess && (
        <MediaModalDisplay asset={data} onClose={handleClose} />
      )}
    </MediaModal>
  );
}

export default PoiMediaModalContainer;
