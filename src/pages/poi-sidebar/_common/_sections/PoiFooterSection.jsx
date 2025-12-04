import { useMemo } from "react";
import { useParams } from "react-router";
import { useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SidebarFooterSection from "@/components/sidebar/_sections/SidebarFooterSection";
import useParamsTabs from "@/hooks/useParamsTabs";

function PoiFooterSection({
  onCancel,
  onSubmit,
  steps = [],
  fieldsPerStep = [],
}) {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useParamsTabs("poiTab");
  const { poiId } = useParams();
  const isNew = !poiId;

  const {
    trigger,
    formState: { errors },
  } = useFormContext();

  const currentStep = useMemo(() => {
    if (!steps) return 0;
    return steps.findIndex((step) => step === activeTab);
  }, [activeTab, steps]);

  const renderPreviousButton = isNew && currentStep > 0;
  const renderNextButton = isNew && currentStep < steps.length - 2;
  const renderCreateButton = isNew && currentStep === steps.length - 2;
  const renderUpdateButton = !isNew && activeTab !== "media";

  const handleNextStep = async () => {
    await validateStep(currentStep);

    const nextStep = steps[currentStep + 1];
    if (nextStep) {
      setActiveTab(nextStep);
    }
  };
  const handlePreviousStep = () => {
    const prevStep = steps[currentStep - 1];
    if (prevStep) {
      setActiveTab(prevStep);
    }
  };

  const validateStep = async (step) => {
    const currentStepFields = fieldsPerStep[step] || [];
    const isValid = await trigger(currentStepFields);
    return isValid;
  };

  const isNextDisabled = useMemo(() => {
    const currentStepFields = fieldsPerStep[currentStep] || [];
    return currentStepFields.some((field) => errors[field]);
  }, [errors, currentStep, fieldsPerStep]);

  const handleFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <SidebarFooterSection>
      <Button onClick={onCancel}>{t("poiSidebar.footer.cancel")}</Button>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        {renderPreviousButton && (
          <Button variant="outlined" onClick={handlePreviousStep}>
            {t("poiSidebar.footer.previous")}
          </Button>
        )}
        {renderNextButton && (
          <Button
            variant="filled"
            isDisabled={isNextDisabled}
            onClick={handleNextStep}
          >
            {t("poiSidebar.footer.nextStep")}
          </Button>
        )}
        {renderCreateButton && (
          <Button onClick={handleFormSubmit} variant="filled">
            {t("poiSidebar.footer.createAndAddMedia")}
          </Button>
        )}
        {renderUpdateButton && (
          <Button
            onClick={handleFormSubmit}
            variant="filled"
            startIcon={<EurekaIcon name="save" />}
          >
            {t("poiSidebar.footer.saveChanges")}
          </Button>
        )}
      </Stack>
    </SidebarFooterSection>
  );
}

export default PoiFooterSection;
