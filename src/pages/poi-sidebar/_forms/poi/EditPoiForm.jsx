import { useMemo } from "react";
import { useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";

import {
  useTourPoiMultilingual,
  useUpdateTourPoi,
} from "@/services/poiService";
import useNavPaths from "@/hooks/useNavPaths";
import PoiFormContainer from "./PoiFormContainer";

function EditPoiForm({ onClose }) {
  const { routes, navigate } = useNavPaths();
  const { projectId, tourId, poiId } = useParams();

  const { data: initialPoi, fetchState } = useTourPoiMultilingual(
    projectId,
    tourId,
    poiId,
  );
  const { mutate: updatePoi } = useUpdateTourPoi(projectId, tourId, poiId);

  console.log(initialPoi);

  const defaultValues = useMemo(
    () => ({
      title: initialPoi?.title,
      description: initialPoi?.description,
      thumbnail: initialPoi?.thumbnail,
      coordinates: initialPoi?.coordinates,
      externalLinks: initialPoi?.externalLinks,
      quizLinks: initialPoi?.quizLinks,
      assets: initialPoi?.assets,
      createdAt: initialPoi?.createdAt,
      updatedAt: initialPoi?.updatedAt,
    }),
    [initialPoi],
  );

  const onSubmit = async (data) => {
    console.log(data);
    await updatePoi({ data });
    navigate(`${routes.pois.one(poiId)}`);
  };

  if (fetchState.isLoading) {
    return <PoiFormContainer.Skeleton />;
  }

  return (
    <PoiFormContainer
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}

export default EditPoiForm;
