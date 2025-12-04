import { useMemo } from "react";
import { useParams } from "react-router";
import { useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SidebarFooterSection from "@/components/sidebar/_sections/SidebarFooterSection";
import useParamsTabs from "@/hooks/useParamsTabs";

function PoiFooterSection({ onCancel, steps = [], fieldsPerStep = [] }) {
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
  const renderUpdateButton = !isNew;

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

  return (
    <SidebarFooterSection>
      <Button onClick={onCancel}>Cancel</Button>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        {renderPreviousButton && (
          <Button variant="outlined" onClick={handlePreviousStep}>
            Previous
          </Button>
        )}
        {renderNextButton && (
          <Button
            variant="filled"
            isDisabled={isNextDisabled}
            onClick={handleNextStep}
          >
            Next Step
          </Button>
        )}
        {renderCreateButton && (
          <Button type="submit" form="poi-form" variant="filled">
            Create and add media
          </Button>
        )}
        {renderUpdateButton && (
          <Button
            type="submit"
            form="poi-form"
            variant="filled"
            startIcon={<EurekaIcon name="save" />}
          >
            Save Changes
          </Button>
        )}
      </Stack>
    </SidebarFooterSection>
  );
}

export default PoiFooterSection;
