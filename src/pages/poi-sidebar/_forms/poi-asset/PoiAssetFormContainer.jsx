import { FormProvider, useForm } from "react-hook-form";

import PoiAssetForm from "./PoiAssetForm";

function PoiAssetFormContainer({ defaultValues, onSubmit }) {
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <PoiAssetForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default PoiAssetFormContainer;
