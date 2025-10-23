import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import useNavPaths from "@/hooks/useNavPaths";
import wait from "@/utils/wait";
import TourForm from "./TourForm";

function CreateTourForm() {
  const { routes } = useNavPaths();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      title: { locales: { en: "", fr: "" } },
      description: { locales: { en: "", fr: "" } },
      pois: [],
      duration: 0,
      distance: 0,
      thumbnail: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    wait(1000).then(() => {
      navigate(`${routes.tours.one("tour-001")}`);
    });
  };

  return (
    <FormProvider {...methods}>
      <TourForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default CreateTourForm;
