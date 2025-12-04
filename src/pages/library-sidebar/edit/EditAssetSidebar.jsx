import { useTranslation } from "react-i18next";

import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import AssetSidebar from "../_common/sidebar";
import EditAssetForm from "../_form/EditAssetForm";

function EditAssetSidebar() {
  const { t } = useTranslation();

  return (
    <AssetSidebar>
      {({ onClose }) => {
        return (
          <>
            <SidebarHeader title={t("librarySidebar.edit.title")} onClose={onClose} />
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
