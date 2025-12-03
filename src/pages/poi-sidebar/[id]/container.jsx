import { useParams } from "react-router";

import useFormLocale from "@/stores/useFormLocale";
import { useTourPoi } from "@/services/poiService";
import ViewPoiSidebarContent from "./content";
import ViewPoiSidebarError from "./error";
import ViewPoiSidebarLayout from "./layout";
import ViewPoiSidebarLoading from "./loading";

function ViewPoiSidebarContainer() {
  const { poiId } = useParams();
  const { locale } = useFormLocale();

  const { data, fetchState } = useTourPoi(poiId, locale);

  if (fetchState.isLoading) {
    return (
      <ViewPoiSidebarLayout>
        <ViewPoiSidebarLoading />
      </ViewPoiSidebarLayout>
    );
  }

  if (fetchState.isError) {
    return (
      <ViewPoiSidebarLayout>
        <ViewPoiSidebarError />
      </ViewPoiSidebarLayout>
    );
  }

  if (fetchState.isSuccess && data) {
    return (
      <ViewPoiSidebarLayout>
        <ViewPoiSidebarContent poi={data} />
      </ViewPoiSidebarLayout>
    );
  }
}

export default ViewPoiSidebarContainer;
