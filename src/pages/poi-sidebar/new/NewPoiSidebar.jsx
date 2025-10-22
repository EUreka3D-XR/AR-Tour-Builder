import ToggleVisibility from "../_common/_components/ToggleVisibility";
import PoiAssetDetailsSection from "../_common/_sections/PoiAssetDetailsSection";
import PoiSidebar from "../_common/sidebar";
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
              <PoiAssetDetailsSection />
            </ToggleVisibility>
          </>
        );
      }}
    </PoiSidebar>
  );
}

export default NewPoiSidebar;
