import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { useOptionsListDialog } from "@/stores/dialog-modal-stores";
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
  sourceAssetId: "",
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
  const { t } = useTranslation();

  const { poiId, tourId } = useParams();
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get("libraryMedia");

  const locale = useLocale();
  const open = useOptionsListDialog();

  const { data, fetchState } = useLibraryAssetMultilingual(assetId);
  const { mutate: createAsset } = useCreatePoiAsset(tourId, poiId, locale);

  const defaultValues = useMemo(() => {
    if (assetId && data) {
      const { id: sourceAssetId, ...restData } = data;
      return { ...DEFAULT_VALUES, ...restData, sourceAssetId };
    }
    return DEFAULT_VALUES;
  }, [assetId, data]);

  if (fetchState.isLoading) return <SidebarSkeleton />;
  if (fetchState.isError) return <div>Error loading asset.</div>;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data) => {
    const { sourceAssetId, ...restData } = data;

    if (sourceAssetId) {
      const res = await open({
        title: t("asset.form.variation_dialog.title"),
        message: t("asset.form.variation_dialog.message"),
        options: [
          { label: t("asset.form.variation_dialog.yes"), value: "yes" },
          { label: t("asset.form.variation_dialog.no"), value: "no" },
        ],
      });

      if (!res) {
        return;
      }

      if (res === "yes") {
        await createAsset({ data: restData }); // Does not contain the sourceAssetId, creates a new asset variation
      } else if (res === "no") {
        await createAsset({ data }); // Contains the sourceAssetId, does not create a variation
      }
      handleClose();
      return;
    }

    await createAsset({ data }); // Does not contain the sourceAssetId, creates a new asset variation
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
