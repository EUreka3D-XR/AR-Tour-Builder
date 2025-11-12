import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import AssetSidebar from "../_common/sidebar";
import NewAssetForm from "../_form/NewAssetForm";

function NewAssetSidebar() {
  return (
    <AssetSidebar>
      {({ onClose }) => {
        return (
          <>
            <SidebarHeader title="Create a Media Asset" onClose={onClose} />
            <SidebarFormArea className="sidebar-form-area">
              <div className="main-area">
                <NewAssetForm onClose={onClose} />
              </div>
            </SidebarFormArea>
          </>
        );
      }}
    </AssetSidebar>
  );
}

export default NewAssetSidebar;
