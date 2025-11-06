import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import FormNavigationFooter from "@/components/form/FormNavigationFooter";
import FormNavigationHeader from "@/components/form/FormNavigationHeader";
import useParamsTabs from "@/hooks/useParamsTabs";
import ProjectFormMain from "./_layout/ProjectFormMain";

const PARAM_KEY = "projectTab";

function ProjectForm({ isNew, defaultValues, validationSchemas, onSubmit }) {
  const { activeTabIndex } = useParamsTabs(PARAM_KEY, projectTabs);
  const currentValidationSchema = validationSchemas[activeTabIndex];

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
  });

  const { handleSubmit } = methods;

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
          <ProjectFormMain />
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

const projectTabs = [
  { icon: "diamond_shine", value: "languages", label: "Supported Languages" },
  { icon: "info", value: "basic-info", label: "Basic Information" },
  { icon: "language", value: "branding", label: "Branding" },
];
