import { useTranslation } from "react-i18next";

import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import AssetSidebar from "../_common/sidebar";
import NewAssetForm from "../_form/NewAssetForm";

function NewAssetSidebar() {
  const { t } = useTranslation();

  return (
    <AssetSidebar>
      {({ onClose }) => {
        return (
          <>
            <SidebarHeader title={t("librarySidebar.new.title")} onClose={onClose} />
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
