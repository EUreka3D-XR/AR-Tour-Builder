import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import useParamsTabs from "@/hooks/useParamsTabs";
import { SchemaPerPoiTab } from "../../_common/_utils/poiSchemaPerTab";
import PoiForm from "./PoiForm";

function PoiFormContainer({ defaultValues, onSubmit, onClose }) {
  const { t } = useTranslation();

  const { activeTab } = useParamsTabs("poiTab");

  const poiTabs = useMemo(
    () => [
      { icon: "poi", value: "location", label: t("poiSidebar.tabs.location") },
      { icon: "info", value: "details", label: t("poiSidebar.tabs.details") },
      {
        icon: "link",
        value: "external-links",
        label: t("poiSidebar.tabs.externalLinks"),
      },
      { icon: "media", value: "media", label: t("poiSidebar.tabs.media") },
    ],
    [t],
  );

  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
    revalidate: "onChange",
    resolver: (values, context, options) => {
      const schema = SchemaPerPoiTab[activeTab];
      if (!schema) return { values, errors: {} };
      return yupResolver(schema)(values, context, options);
    },
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <PoiForm
        poiTabs={poiTabs}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </FormProvider>
  );
}

export default PoiFormContainer;
