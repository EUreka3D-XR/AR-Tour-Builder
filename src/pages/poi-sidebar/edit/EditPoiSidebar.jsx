import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function EditPoiSidebar() {
  return (
    <PoiSidebar>
      {({ showAssetForm, onCloseAsset, onClosePoi }) => {
        return (
          <SidebarFormArea className="sidebar-form-area">
            <ToggleVisibility show={!showAssetForm}>
              <div className="main-area">
                <NewPoiForm onClose={onClosePoi} />
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
