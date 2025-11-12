import { FormProvider, useForm } from "react-hook-form";

import AssetForm from "@/components/asset-form/AssetForm";

function PoiAssetFormContainer({ defaultValues, onSubmit, onClose }) {
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <AssetForm
        isPoiAsset
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </FormProvider>
  );
}

export default PoiAssetFormContainer;
