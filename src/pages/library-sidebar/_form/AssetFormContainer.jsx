import { FormProvider, useForm } from "react-hook-form";

import AssetForm from "@/components/asset-form/AssetForm";

function AssetFormContainer({ defaultValues, onSubmit, onClose }) {
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <AssetForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />
    </FormProvider>
  );
}

export default AssetFormContainer;
