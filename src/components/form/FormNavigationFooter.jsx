import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material";

import Button from "@/components/button/Button";
import useParamsTabs from "@/hooks/useParamsTabs";

const FooterStyled = styled("div")(({ theme }) => ({
  label: "project-footer-section",
  display: "flex",
  justifyContent: "flex-end",
  "& .footer-actions": {
    display: "flex",
    alignItems: "baseline",
    gap: theme.spacing(2),
  },
}));

function FormNavigationFooter({ isNew, paramKey, tabs = [] }) {
  const { activeTabIndex, goToNextTab, goToPreviousTab } = useParamsTabs(
    paramKey,
    tabs,
  );
  const totalTabs = tabs.length;

  const showBackButton = isNew && activeTabIndex > 0;
  const showNextButton = isNew && activeTabIndex < totalTabs - 1;
  const showSaveButton = !isNew || activeTabIndex === totalTabs - 1;

  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    goToNextTab();
  };
  const handleBack = () => {
    goToPreviousTab();
  };

  return (
    <FooterStyled>
      <div className="footer-actions">
        {showBackButton && (
          <Button onClick={handleBack} variant="outlined">
            Back
          </Button>
        )}
        {showNextButton && (
          <Button onClick={handleNext} variant="filled">
            Next
          </Button>
        )}
        {showSaveButton && (
          <Button type="submit" variant="filled">
            Save
          </Button>
        )}
      </div>
    </FooterStyled>
  );
}

export default FormNavigationFooter;
