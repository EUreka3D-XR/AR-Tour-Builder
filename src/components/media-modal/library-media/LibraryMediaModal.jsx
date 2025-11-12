import { useLocation, useParams } from "react-router";

import { useLibraryAsset } from "@/services/libraryService";
import useNavPaths from "@/hooks/useNavPaths";
import CenteredArea from "../../centered/Centered";
import ErrorArea from "../../error/ErrorArea";
import DisplayLoading from "../../media-display/_common/DisplayLoading";
import MediaModal from "../layout";
import MediaModalDisplay from "../MediaModalDisplay";

function LibraryMediaModal() {
  const { navigate } = useNavPaths();
  const location = useLocation();

  const { projectId, assetId } = useParams();
  const { data, fetchState } = useLibraryAsset(projectId, assetId);

  // Modal is open if assetId exists and URL doesn't end with /edit
  const isOpen = !!assetId && !location.pathname.endsWith("/edit");
  const handleClose = () => {
    navigate(-1);
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

export default LibraryMediaModal;
