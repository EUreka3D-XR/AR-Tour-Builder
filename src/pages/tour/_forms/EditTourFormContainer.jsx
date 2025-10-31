import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import { useUpdateTour } from "@/services/toursService";
import useNavPaths from "@/hooks/useNavPaths";
import TourForm from "./TourForm";

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Tour} props.initialTour
 * @returns
 */
function EditTourForm({ initialTour }) {
  const { routes, navigate } = useNavPaths();

  const { projectId, tourId } = useParams();

  const { mutate: updateTour } = useUpdateTour(projectId, tourId);

  const methods = useForm({
    shouldUnregister: false,
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
      guided: initialTour.guided ?? false,
      coordinates: initialTour.coordinates,
      status: initialTour.status,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    await updateTour({ data });

    navigate(`${routes.tours.one(tourId)}`);
  };

  return (
    <FormProvider {...methods}>
      <TourForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default EditTourForm;
