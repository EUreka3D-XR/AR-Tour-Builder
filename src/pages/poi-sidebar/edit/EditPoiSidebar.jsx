import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import EditPoiForm from "../_forms/poi/EditPoiForm";

function EditPoiSidebar() {
  return (
    <PoiSidebar>
      {({ showAssetForm, onCloseAsset, onClosePoi }) => {
        return (
          <SidebarFormArea className="sidebar-form-area">
            <ToggleVisibility show={!showAssetForm}>
              <div className="main-area">
                <EditPoiForm onClose={onClosePoi} />
              </div>
            </ToggleVisibility>
            <ToggleVisibility show={showAssetForm}>
              <div className="main-area">
                <EditPoiAssetForm onClose={onCloseAsset} />
              </div>
            </ToggleVisibility>
          </SidebarFormArea>
        );
      }}
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
