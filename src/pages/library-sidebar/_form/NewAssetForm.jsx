import { useParams } from "react-router";

import { useCreateAsset } from "@/services/libraryService";
import AssetFormContainer from "./AssetFormContainer";

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
    coordinates: {
      lat: "",
      long: "",
    },
  },
  isGeoreferenced: false,
};
function NewAssetForm({ onClose }) {
  const { projectId } = useParams();
  const { mutate: createAsset } = useCreateAsset(projectId);

  const onSubmit = async (data) => {
    await createAsset({ data });
    onClose();
  };
  return (
    <AssetFormContainer
      defaultValues={DEFAULT_VALUES}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}

export default NewAssetForm;
