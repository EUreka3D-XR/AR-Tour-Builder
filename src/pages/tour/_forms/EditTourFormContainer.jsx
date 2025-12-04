import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import { useUpdateTour } from "@/services/toursService";
import TourForm from "./TourForm";

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Tour} props.initialTour
 * @returns
 */
function EditTourForm({ initialTour }) {
  const { tourId } = useParams();

  const { mutate: updateTour } = useUpdateTour(tourId);

  const methods = useForm({
    shouldUnregister: false,
    defaultValues: parseTourDefaultValues(initialTour),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const updatedTour = await updateTour({ data });
    reset(parseTourDefaultValues(updatedTour));
  };

  return (
    <FormProvider {...methods}>
      <TourForm onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

export default EditTourForm;

const parseTourDefaultValues = (tour) => {
  return {
    title: tour.title,
    description: tour.description,
    pois: tour.pois,
    duration: tour.duration ?? 0,
    distance: tour.distance ?? 0,
    thumbnail: tour.thumbnail,
    createdAt: tour.createdAt,
    updatedAt: tour.updatedAt,
    boundBox: tour.boundBox,
    guided: tour.guided ?? false,
    coordinates: tour.coordinates,
    status: tour.status,
  };
};
