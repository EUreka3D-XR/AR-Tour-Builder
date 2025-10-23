import PoiMainSection from "../../_common/_sections/PoiMainSection";

function PoiForm({ onSubmit }) {
  return (
    <form id="poi-form" onSubmit={onSubmit}>
      <PoiMainSection />
    </form>
  );
}

export default PoiForm;
