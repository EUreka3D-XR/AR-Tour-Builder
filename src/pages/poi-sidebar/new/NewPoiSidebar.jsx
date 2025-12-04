import { useTranslation } from "react-i18next";

import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import NewPoiAssetForm from "../_forms/poi-asset/NewPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function NewPoiSidebar() {
  const { t } = useTranslation();

  return (
    <PoiSidebar>
      {({
        showCreateAssetForm,
        showEditAssetForm,
        showPoiForm,
        onCloseAsset,
        onClosePoi,
      }) => {
        return (
          <>
            <SidebarHeader
              title={t("poiSidebar.new.title")}
              onClose={onClosePoi}
            />
            <SidebarFormArea className="sidebar-form-area">
              <ToggleVisibility show={showPoiForm}>
                <div className="main-area">
                  <NewPoiForm onClose={onClosePoi} />
                </div>
              </ToggleVisibility>
              <div className="main-area">
                {showCreateAssetForm && (
                  <NewPoiAssetForm onClose={onCloseAsset} />
                )}
                {showEditAssetForm && (
                  <EditPoiAssetForm onClose={onCloseAsset} />
                )}
              </div>
            </SidebarFormArea>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default NewPoiSidebar;
