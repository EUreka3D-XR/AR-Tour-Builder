import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import PoiSidebar from "../_common/sidebar";
import ViewPoiSidebarContainer from "./container";

function ViewPoiSidebar() {
  return (
    <PoiSidebar>
      {({ onClosePoi }) => {
        return (
          <>
            <SidebarHeader title="Point of Interest" onClose={onClosePoi} />
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
