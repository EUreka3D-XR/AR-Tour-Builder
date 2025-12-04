import { useParams } from "react-router";

import { useCreateTourPoi } from "@/services/poiService";
import useNavPaths from "@/hooks/useNavPaths";
import PoiFormContainer from "./PoiFormContainer";

const DEFAULT_POI_VALUES = {
  title: {
    locales: {
      en: "",
      fr: "",
    },
  },
  description: {
    locales: {
      en: "",
      fr: "",
    },
  },
  coordinates: {
    lat: 0,
    long: 0,
  },
  radius: 20,
  thumbnai: "",
  externalLinks: [],
  quizLinks: [],
  poiAssets: [],
};
function NewPoiForm({ onClose }) {
  const { tourId } = useParams();
  const { routes, navigate } = useNavPaths();

  const { mutate: createPoi } = useCreateTourPoi(tourId);
  const onSubmit = async (data) => {
    await createPoi({ data });
    navigate(`${routes.pois.one("new-poi-id")}`);
  };

  return (
    <PoiFormContainer
      defaultValues={DEFAULT_POI_VALUES}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}

export default NewPoiForm;
