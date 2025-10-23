import ToggleVisibility from "../_common/_components/ToggleVisibility";
import PoiSidebar from "../_common/sidebar";
import NewPoiAssetForm from "../_forms/poi-asset/NewPoiAssetForm";
import NewPoiForm from "../_forms/poi/NewPoiForm";

function NewPoiSidebar() {
  return (
    <PoiSidebar>
      {({ showAssetForm }) => {
        return (
          <>
            <ToggleVisibility show={!showAssetForm}>
              <NewPoiForm />
            </ToggleVisibility>
            <ToggleVisibility show={showAssetForm}>
              <NewPoiAssetForm />
            </ToggleVisibility>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default NewPoiSidebar;
