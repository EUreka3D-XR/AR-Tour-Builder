import { FormProvider, useForm } from "react-hook-form";

import PoiForm from "./PoiForm";

function PoiFormContainer({ defaultValues, onSubmit, onClose }) {
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <PoiForm onSubmit={handleSubmit(onSubmit)} onClose={onClose} />
    </FormProvider>
  );
}

export default PoiFormContainer;
