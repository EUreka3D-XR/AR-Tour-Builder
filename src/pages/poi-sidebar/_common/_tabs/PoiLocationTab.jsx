import CoordinatesInput from "@/components/coordinates-input/CoordinatesInput";

function PoiLocationTab() {
  return (
    <div className="poi-location-tab">
      <CoordinatesInput name="coordinates" showHelperText showMap />
    </div>
  );
}

export default PoiLocationTab;
