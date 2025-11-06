import { useMemo } from "react";
import { useParams } from "react-router";
import { useFormContext } from "react-hook-form";
import { styled, Tab, Tabs } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useParamsTabs from "@/hooks/useParamsTabs";

const NavigationAreaStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .tabs-row": {
    padding: theme.spacing(1, 3, 0),
    "& .tab-item": {
      padding: theme.spacing(0, 4),
    },
  },
}));

function ProjectFormNavigationTabs({ tabs: projectTabs = [], fieldsPerStep }) {
  const { projectId } = useParams();
  const isNew = !projectId;

  const {
    trigger,
    formState: { errors },
  } = useFormContext();

  const { activeTab, setActiveTab, tabs } = useParamsTabs(
    "projectTab",
    projectTabs,
    "languages",
  );

  const validityPerSteps = useMemo(() => {
    const validity = {};
    if (!fieldsPerStep) return validity;

    let previousStepsValid = true;

    projectTabs.forEach((tab, index) => {
      const stepFields = fieldsPerStep[index] || [];
      const isStepValid = !stepFields.some((field) => errors[field]);
      previousStepsValid = previousStepsValid && isStepValid;
      validity[tab.value] = previousStepsValid;
    });

    return validity;
  }, [errors, fieldsPerStep, projectTabs]);

  const validateStep = async (step) => {
    const currentStepFields = fieldsPerStep[step] || [];
    const isValid = await trigger(currentStepFields);
    return isValid;
  };

  const changeTab = (e, val) => {
    const tabIndex = projectTabs.findIndex((tab) => tab.value === val);
    if (!isNew && validityPerSteps[val] === false) {
      const isValid = validateStep(tabIndex);
      if (!isValid) {
        return;
      }
    }
    setActiveTab(e, val);
  };

  return (
    <NavigationAreaStyled>
      <Tabs value={activeTab} className="tabs-row" onChange={changeTab}>
        {tabs.map((tab, index) => {
          const id = `project-nav-tab-${index}`;
          const aria = `project-nav-tabpanel-${index}`;
          return (
            <Tab
              key={id}
              id={id}
              aria-controls={aria}
              value={tab.value}
              label={tab.label}
              disabled={isNew && validityPerSteps[tab.value] === false}
              icon={<EurekaIcon name={tab.icon} fontSize="small" />}
              iconPosition="start"
              className="tab-item"
            />
          );
        })}
      </Tabs>
    </NavigationAreaStyled>
  );
}

export default ProjectFormNavigationTabs;
