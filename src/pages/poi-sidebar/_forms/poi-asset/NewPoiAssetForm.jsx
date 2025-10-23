import { FormProvider, useForm } from "react-hook-form";

import PoiAssetForm from "./PoiAssetForm";

function NewPoiAssetForm() {
  const methods = useForm({
    defaultValues: {
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
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <PoiAssetForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default NewPoiAssetForm;
