import { useMemo } from "react";
import { useParams } from "react-router";
import { Stack, styled } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useParamsTabs from "@/hooks/useParamsTabs";

const FooterStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}));

function PoiFooterSection({ onCancel, steps = [] }) {
  const { activeTab, setActiveTab } = useParamsTabs("poiTab");

  const { poiId } = useParams();
  const isNew = !poiId;

  const currentStep = useMemo(() => {
    if (!steps) return 0;
    return steps.findIndex((step) => step === activeTab);
  }, [activeTab, steps]);

  const renderPreviousButton = isNew && currentStep > 0;
  const renderNextButton = isNew && currentStep < steps.length - 1;
  const renderSaveButton = isNew && currentStep === steps.length - 1;
  const renderUpdateButton = !isNew;

  const handleNextStep = () => {
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

  return (
    <FooterStyled className="poi-sidebar-footer">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
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
            <Button variant="filled" onClick={handleNextStep}>
              Next Step
            </Button>
          )}
          {renderSaveButton && (
            <Button
              type="submit"
              variant="filled"
              startIcon={<EurekaIcon name="save" />}
            >
              Save
            </Button>
          )}
          {renderUpdateButton && (
            <Button
              type="submit"
              variant="filled"
              startIcon={<EurekaIcon name={"save"} />}
            >
              Save Changes
            </Button>
          )}
        </Stack>
      </Stack>
    </FooterStyled>
  );
}

export default PoiFooterSection;
