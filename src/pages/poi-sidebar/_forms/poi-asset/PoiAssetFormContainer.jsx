import { FormProvider, useForm } from "react-hook-form";

import PoiAssetForm from "./PoiAssetForm";

function PoiAssetFormContainer({ defaultValues, onSubmit, onClose }) {
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <PoiAssetForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />
    </FormProvider>
  );
}

export default PoiAssetFormContainer;
