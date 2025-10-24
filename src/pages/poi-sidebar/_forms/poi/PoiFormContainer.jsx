import { FormProvider, useForm } from "react-hook-form";
import { Skeleton, Stack } from "@mui/material";

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

function PoiFormSkeleton() {
  return (
    <Stack spacing={10} padding={3}>
      <Skeleton height={80} />
      <Skeleton height={400} />
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Skeleton height={40} width="50%" />
        <Skeleton height={40} width="50%" />
      </Stack>
      <Stack alignItems="flex-end">
        <Skeleton height={50} width="200px" />
      </Stack>
    </Stack>
  );
}

PoiFormContainer.Skeleton = PoiFormSkeleton;
