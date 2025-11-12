import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import AssetSidebar from "../_common/sidebar";
import EditAssetForm from "../_form/EditAssetForm";

function EditAssetSidebar() {
  return (
    <AssetSidebar>
      {({ onClose }) => {
        return (
          <>
            <SidebarHeader title="Editing Asset" onClose={onClose} />
            <SidebarFormArea className="sidebar-form-area">
              <div className="main-area">
                <EditAssetForm onClose={onClose} />
              </div>
            </SidebarFormArea>
          </>
        );
      }}
    </AssetSidebar>
  );
}

export default EditAssetSidebar;
