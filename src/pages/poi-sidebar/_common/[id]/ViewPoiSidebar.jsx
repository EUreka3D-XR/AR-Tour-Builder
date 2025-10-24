import PoiSidebarHeader from "../_sections/PoiSidebarHeader";
import SidebarFormArea from "../_utils/SidebarFormArea";
import PoiSidebar from "../sidebar";
import ViewPoiSidebarContainer from "./container";

function ViewPoiSidebar() {
  return (
    <PoiSidebar>
      {({ onClosePoi }) => {
        return (
          <>
            <div className="no-shrink">
              <PoiSidebarHeader
                title="Point of Interest"
                onClose={onClosePoi}
              />
            </div>
            <SidebarFormArea className="sidebar-form-area">
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
