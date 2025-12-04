import { useTranslation } from "react-i18next";

import SidebarHeader from "@/components/sidebar/_sections/SidebarHeaderSection";
import SidebarFormArea from "../_common/_utils/SidebarFormArea";
import ToggleVisibility from "../_common/_utils/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import NewPoiAssetForm from "../_forms/poi-asset/NewPoiAssetForm";
import EditPoiForm from "../_forms/poi/EditPoiForm";

function EditPoiSidebar() {
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
              title={t("poiSidebar.edit.title")}
              onClose={onClosePoi}
            />
            <SidebarFormArea className="sidebar-form-area">
              <ToggleVisibility show={showPoiForm}>
                <div className="main-area">
                  <EditPoiForm onClose={onClosePoi} />
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

export default EditPoiSidebar;
