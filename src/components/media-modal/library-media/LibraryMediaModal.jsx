import { useLibraryAsset } from "@/services/libraryService";
import MediaDisplay from "@/components/media-display/MediaDisplay";
import CenteredArea from "../../centered/Centered";
import ErrorArea from "../../error/ErrorArea";
import DisplayLoading from "../../media-display/_common/DisplayLoading";
import MediaModal from "../layout";

function LibraryMediaModal({ projectId, assetId, onClose }) {
  const { data, fetchState } = useLibraryAsset(projectId, assetId);

  return (
    <MediaModal isOpen onClose={onClose}>
      {fetchState.isLoading && <DisplayLoading />}
      {fetchState.isError && (
        <CenteredArea>
          <ErrorArea />
        </CenteredArea>
      )}
      {fetchState.isSuccess &&
        (data ? <MediaDisplay asset={data} onClose={onClose} /> : null)}
    </MediaModal>
  );
}

export default LibraryMediaModal;
