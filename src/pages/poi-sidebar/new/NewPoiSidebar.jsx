import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import NewPoiAssetForm from "../_forms/poi-asset/NewPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function NewPoiSidebar() {
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
                <NewPoiAssetForm onClose={onCloseAsset} />
              </div>
            </ToggleVisibility>
          </SidebarFormArea>
        );
      }}
    </PoiSidebar>
  );
}

export default NewPoiSidebar;
