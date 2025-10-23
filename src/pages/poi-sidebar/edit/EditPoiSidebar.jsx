import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function EditPoiSidebar() {
  return (
    <PoiSidebar>
      {({ showAssetForm, onCloseAsset, onClosePoi }) => {
        return (
          <>
            <ToggleVisibility show={!showAssetForm}>
              <NewPoiForm onClose={onClosePoi} />
            </ToggleVisibility>
            <ToggleVisibility show={showAssetForm}>
              <EditPoiAssetForm onClose={onCloseAsset} />
            </ToggleVisibility>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
