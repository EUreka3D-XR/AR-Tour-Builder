import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import ViewPoiSidebarContainer from "./container";

function ViewPoiSidebar() {
  return (
    <PoiSidebar>
      {({ onClosePoi, onCloseAsset, showPoiForm, showEditAssetForm }) => {
        return (
          <>
            <SidebarHeader title="Point of Interest" onClose={onClosePoi} />
            <SidebarFormArea className="sidebar-form-area">
              <ToggleVisibility show={showPoiForm}>
                <div className="main-area">
                  <ViewPoiSidebarContainer />
                </div>
              </ToggleVisibility>
              <div className="main-area">
                {showEditAssetForm && (
                  <EditPoiAssetForm onClose={onCloseAsset} />
                )}
              </div>
              <div className="main-area">
                <ViewPoiSidebarContainer />
              </div>
            </SidebarFormArea>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default ViewPoiSidebar;
