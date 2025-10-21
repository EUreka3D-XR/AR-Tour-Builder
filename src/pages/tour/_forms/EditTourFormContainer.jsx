import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import useNavPaths from "@/hooks/useNavPaths";
import wait from "@/utils/wait";
import TourForm from "./TourForm";

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Tour} props.initialTour
 * @returns
 */
function EditTourForm({ initialTour }) {
  const { routes } = useNavPaths();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      title: initialTour.title,
      description: initialTour.description,
      pois: initialTour.pois,
      duration: initialTour.duration ?? 0,
      distance: initialTour.distance ?? 0,
      thumbnail: initialTour.thumbnail,
      createdAt: initialTour.createdAt,
      updatedAt: initialTour.updatedAt,
      boundBox: initialTour.boundBox,
      coordinates: initialTour.coordinates,
      status: initialTour.status,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    wait(1000).then(() => {
      navigate(`${routes.tours.one("new-tour-id")}`);
    });
  };

  return (
    <FormProvider {...methods}>
      <TourForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default EditTourForm;
