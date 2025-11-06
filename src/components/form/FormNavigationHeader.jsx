import FormNavigationSteps from "./FormNavigationSteps";
import FormNavigationTabs from "./FormNavigationTabs";

function FormNavigationHeader({ isNew, paramKey, initialTab, tabs }) {
  if (isNew) {
    return (
      <FormNavigationSteps
        paramKey={paramKey}
        initialTab={initialTab}
        tabs={tabs}
      />
    );
  }

  return (
    <FormNavigationTabs
      paramKey={paramKey}
      initialTab={initialTab}
      tabs={tabs}
    />
  );
}

export default FormNavigationHeader;
