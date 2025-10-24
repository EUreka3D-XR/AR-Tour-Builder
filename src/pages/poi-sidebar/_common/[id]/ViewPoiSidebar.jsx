import PoiSidebarHeader from "../_sections/PoiSidebarHeader";
import SidebarFormArea from "../_utils/SidebarFormArea";
import PoiSidebar from "../sidebar";

function ViewPoiSidebar() {
  return (
    <PoiSidebar>
      {({ onClosePoi }) => {
        return (
          <>
            <div className="no-shrink">
              <PoiSidebarHeader
                title="Editting Point of Interest"
                onClose={onClosePoi}
              />
            </div>
            <SidebarFormArea className="sidebar-form-area">
              <div className="main-area">hahaha</div>
            </SidebarFormArea>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default ViewPoiSidebar;
