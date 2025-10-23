import ToggleVisibility from "../_common/_components/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import EditPoiAssetForm from "../_forms/poi-asset/EditPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function EditPoiSidebar() {
  return (
    <PoiSidebar>
      {({ showAssetForm }) => {
        return (
          <>
            <ToggleVisibility show={!showAssetForm}>
              <NewPoiForm />
            </ToggleVisibility>
            <ToggleVisibility show={showAssetForm}>
              <EditPoiAssetForm />
            </ToggleVisibility>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
