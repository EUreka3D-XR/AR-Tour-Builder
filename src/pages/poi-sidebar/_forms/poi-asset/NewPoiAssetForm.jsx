import { useParams } from "react-router";

import { useCreatePoiAsset } from "@/services/assetsService";
import PoiAssetFormContainer from "./PoiAssetFormContainer";

const DEFAULT_VALUES = {
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
  contentUrl: {
    locales: {
      en: "",
      fr: "",
    },
  },
  type: "",
  georeference: {
    lat: "",
    long: "",
  },
  isGeoreferenced: false,
  modelAssetAttributes: {
    viewInAr: false,
    linkedAsset: {
      contentUrl: {
        locales: {
          en: "",
          fr: "",
        },
      },
      title: {
        locales: {
          en: "",
          fr: "",
        },
      },
    },
  },
};
function NewPoiAssetForm({ onClose }) {
  const { projectId, tourId, poiId } = useParams();
  const { mutate: createAsset } = useCreatePoiAsset(projectId, tourId, poiId);

  const onSubmit = async (data) => {
    await createAsset({ data });
    onClose();
  };
  return (
    <PoiAssetFormContainer
      defaultValues={DEFAULT_VALUES}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}

export default NewPoiAssetForm;
