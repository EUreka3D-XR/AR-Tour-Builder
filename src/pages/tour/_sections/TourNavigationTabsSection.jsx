import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tab,
  Tabs,
} from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useUrlTabs from "@/hooks/useUrlTabs";

const LANGUAGE_OPTIONS = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  },
];

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 2, 0, 0),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .tabs-section": {},
  "& .language-input": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    position: "unset",
    "& .language-select": {
      marginTop: 0,
      "&::before": {
        borderBottomWidth: 0,
      },
      "& >[role='combobox']": {
        paddingBottom: 0,
      },
    },
    "& label": {
      position: "unset",
      transform: "none",
      fontSize: "0.875rem",
    },
  },
}));

function TourNavigationTabsSection() {
  const { tabs, activeTab, setActiveTab } = useUrlTabs([
    { icon: "info", label: "Tour Information", value: "info" },
    { icon: "poi", label: "Points of Interest", value: "pois" },
  ]);

  return (
    <ContainerStyled>
      <Tabs value={activeTab} onChange={setActiveTab}>
        {tabs.map((tab, index) => {
          const id = `tour-nav-tab-${index}`;
          const aria = `tour-nav-tabpanel-${index}`;
          return (
            <Tab
              key={id}
              id={id}
              aria-controls={aria}
              value={tab.value}
              label={tab.label}
              icon={<EurekaIcon name={tab.icon} />}
              iconPosition="start"
            />
          );
        })}
      </Tabs>
      <FormControl size="small" className="language-input item-no-shrink">
        <InputLabel id="language-switcher-label">Input Language:</InputLabel>
        <Select
          labelId="language-switcher-label"
          id="language-switcher"
          value={"en"}
          variant="standard"
          className="language-select"
          onChange={() => {}}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ContainerStyled>
  );
}

export default TourNavigationTabsSection;
