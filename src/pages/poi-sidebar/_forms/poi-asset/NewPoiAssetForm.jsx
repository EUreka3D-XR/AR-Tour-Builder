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
  contentUrl: "",
  assetType: "",
  georeference: {
    lat: "",
    long: "",
  },
  isGeoreferenced: false,
  modelAssetAttributes: {
    viewInAr: false,
    linkedAsset: {
      contentUrl: "",
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
  const onSubmit = (data) => {
    console.log(data);
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
