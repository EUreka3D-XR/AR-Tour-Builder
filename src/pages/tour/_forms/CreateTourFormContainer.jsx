import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import { useCreateTour } from "@/services/toursService";
import useNavPaths from "@/hooks/useNavPaths";
import TourForm from "./TourForm";

function CreateTourForm() {
  const { routes, navigate } = useNavPaths();
  const { projectId } = useParams();

  const { mutate: createTour } = useCreateTour(projectId);

  const methods = useForm({
    shouldUnregister: false,
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

  const onSubmit = async (data) => {
    const newTour = await createTour({ data });

    navigate(`${routes.tours.one(newTour.id)}`);
  };

  return (
    <FormProvider {...methods}>
      <TourForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default CreateTourForm;
