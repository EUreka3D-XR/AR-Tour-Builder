import { useMemo } from "react";
import { useParams } from "react-router";

import {
  useTourPoiMultilingual,
  useUpdateTourPoi,
} from "@/services/poiService";
import useNavPaths from "@/hooks/useNavPaths";
import SidebarSkeleton from "../../_common/_utils/SidebarSkeleton";
import PoiFormContainer from "./PoiFormContainer";

function EditPoiForm({ onClose }) {
  const { routes, navigate } = useNavPaths();
  const { poiId } = useParams();

  const { data: initialPoi, fetchState } = useTourPoiMultilingual(poiId);
  const { mutate: updatePoi } = useUpdateTourPoi(poiId);

  const defaultValues = useMemo(
    () => ({
      title: initialPoi?.title,
      description: initialPoi?.description,
      thumbnail: initialPoi?.thumbnail,
      coordinates: initialPoi?.coordinates,
      radius: initialPoi?.radius,
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
    return <SidebarSkeleton />;
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
