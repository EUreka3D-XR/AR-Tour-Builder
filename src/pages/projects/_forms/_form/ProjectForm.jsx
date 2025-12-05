import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAvailableLocalesProvider } from "@/providers/locales/AvailableLocalesContext";
import FormNavigationFooter from "@/components/form/FormNavigationFooter";
import FormNavigationHeader from "@/components/form/FormNavigationHeader";
import useParamsTabs from "@/hooks/useParamsTabs";
import ProjectFormMain from "./_layout/ProjectFormMain";

const PARAM_KEY = "projectForm";

function ProjectForm({ isNew, defaultValues, validationSchemas, onSubmit }) {
  const { t } = useTranslation();
  const { updateProjectLocales } = useAvailableLocalesProvider();

  const projectTabs = useMemo(
    () => [
      {
        icon: "diamond_shine",
        value: "languages",
        label: t("projects.form.tabs.languages"),
      },
      {
        icon: "info",
        value: "basic-info",
        label: t("projects.form.tabs.basicInfo"),
      },
      { icon: "language", value: "branding", label: t("projects.form.tabs.branding") },
    ],
    [t],
  );

  const { activeTabIndex, setActiveTab } = useParamsTabs(
    PARAM_KEY,
    projectTabs,
  );
  const currentValidationSchema = validationSchemas[activeTabIndex];

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
  });

  const { handleSubmit, watch } = methods;

  // When the form is new, set the active tab to the first tab on mount
  // in case the user refreshed
  useEffect(() => {
    if (isNew) {
      setActiveTab(projectTabs[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const localesValue = watch("locales");
  useEffect(() => {
    updateProjectLocales(localesValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localesValue]);

  return (
    <FormProvider {...methods}>
      <form id="create-project-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormNavigationHeader
            isNew={isNew}
            paramKey={PARAM_KEY}
            initialTab="languages"
            tabs={projectTabs}
          />
          <ProjectFormMain paramKey={PARAM_KEY} />
          <FormNavigationFooter
            isNew={isNew}
            paramKey={PARAM_KEY}
            tabs={projectTabs}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default ProjectForm;
