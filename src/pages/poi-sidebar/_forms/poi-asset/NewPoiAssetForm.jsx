import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router";

import { useCreatePoiAsset } from "@/services/assetsService";
import { useLibraryAssetMultilingual } from "@/services/libraryService";
import { useLocale } from "@/hooks/useLocale";
import SidebarSkeleton from "../../_common/_utils/SidebarSkeleton";
import PoiAssetFormContainer from "./PoiAssetFormContainer";

const DEFAULT_VALUES = {
  title: {
    locales: {
      en: "",
      fr: "",
    },
  },
  description: {
    locales: {
      en: "",
      fr: "",
    },
  },
  contentUrl: {
    locales: {
      en: "",
      fr: "",
    },
  },
  type: "",
  georeference: {
    lat: "",
    long: "",
  },
  priority: "normal",
  isGeoreferenced: false,
  viewInAr: false,
  isGroundPlaced: false,
  spawnRadius: 5,
  linkedAsset: {
    contentUrl: {
      locales: {
        en: "",
        fr: "",
      },
    },
    title: {
      locales: {
        en: "",
        fr: "",
      },
    },
  },
};
function NewPoiAssetForm({ onClose }) {
  const { poiId, tourId } = useParams();
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get("libraryMedia");

  const locale = useLocale();

  const { data, fetchState } = useLibraryAssetMultilingual(assetId);
  const { mutate: createAsset } = useCreatePoiAsset(tourId, poiId, locale);

  const defaultValues = useMemo(() => {
    if (assetId && data) {
      return { ...DEFAULT_VALUES, ...data };
    }
    return DEFAULT_VALUES;
  }, [assetId, data]);

  if (fetchState.isLoading) return <SidebarSkeleton />;
  if (fetchState.isError) return <div>Error loading asset.</div>;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data) => {
    await createAsset({ data });
    handleClose();
  };
  return (
    <PoiAssetFormContainer
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
}

export default NewPoiAssetForm;
