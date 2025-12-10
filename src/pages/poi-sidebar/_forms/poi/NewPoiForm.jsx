import { useParams } from "react-router";

import { useCreateTourPoi } from "@/services/poiService";
import { useLocale } from "@/hooks/useLocale";
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
  assets: [],
};
function NewPoiForm({ onClose }) {
  const { tourId } = useParams();
  const { routes, navigate } = useNavPaths();

  const locale = useLocale();

  const { mutate: createPoi } = useCreateTourPoi(tourId, locale);
  const onSubmit = async (data) => {
    const newPoi = await createPoi({ data });
    navigate(`${routes.pois.one(newPoi.id)}`);
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
