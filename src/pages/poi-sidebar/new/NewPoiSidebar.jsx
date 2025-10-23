import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import NewPoiAssetForm from "../_forms/poi-asset/NewPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function NewPoiSidebar() {
  return (
    <PoiSidebar>
      {({ showAssetForm, onCloseAsset, onClosePoi }) => {
        return (
          <>
            <ToggleVisibility show={!showAssetForm}>
              <NewPoiForm onClose={onClosePoi} />
            </ToggleVisibility>
            <ToggleVisibility show={showAssetForm}>
              <NewPoiAssetForm onClose={onCloseAsset} />
            </ToggleVisibility>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default NewPoiSidebar;
