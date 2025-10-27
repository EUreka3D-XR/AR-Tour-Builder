import EditTourForm from "./_forms/EditTourFormContainer";

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Tour} props.initialTour
 * @returns {React.ReactElement}
 */
function TourPage({ initialTour }) {
  return <EditTourForm initialTour={initialTour} />;
}

export default TourPage;
