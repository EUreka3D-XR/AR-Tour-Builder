import { Step, StepLabel, Stepper, styled } from "@mui/material";

import useParamsTabs from "@/hooks/useParamsTabs";

const NavigationAreaStyled = styled("div")(({ theme }) => ({
  "& .tabs-row": {
    padding: theme.spacing(1, 3, 0),
    "& .tab-item": {
      padding: theme.spacing(0, 4),
    },
  },
}));

function FormNavigationSteps({ paramKey, initialTab, tabs: propTabs = [] }) {
  const { activeTabIndex, setActiveTab, tabs } = useParamsTabs(
    paramKey,
    propTabs,
    initialTab,
  );

  return (
    <NavigationAreaStyled>
      <Stepper
        activeStep={activeTabIndex}
        className="tabs-row"
        onChange={setActiveTab}
      >
        {tabs.map((tab, index) => {
          return (
            <Step key={index}>
              <StepLabel>{tab.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </NavigationAreaStyled>
  );
}

export default FormNavigationSteps;
