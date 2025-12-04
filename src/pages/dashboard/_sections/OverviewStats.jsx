import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import EurekaIcon from "@/components/icon/EurekaIcon";
import { icons } from "@/components/icon/icons";
import DashboardCard from "../_common/DashboardCard";

/**
 * @typedef {import("@/components/icon/icons").IconName} IconName
 */

/**
 * @typedef {Object} OverviewStatsProps
 * @property {number} totalViews - Total number of views
 * @property {number} viewsThisMonth - Number of views this month
 * @property {number} locales - Number of locales
 * @property {number} completionRate - Completion rate percentage
 */

const DashboardCardStyled = styled(DashboardCard)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "& .dash-card-content": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const StatsGrid = styled("div")(({ theme }) => ({
  height: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const StatItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const StatValue = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& .stat-value": {
    fontWeight: 600,
    lineHeight: 1.2,
  },
  "&.total-views": {
    "& .stat-icon": {
      color: theme.palette.primary.main,
    },
    "& .stat-value": {
      color: theme.palette.text.primary,
    },
  },
  "&.monthly-views": {
    "& .stat-icon": {
      color: theme.palette.warning.main,
    },
    "& .stat-value": {
      color: theme.palette.text.primary,
    },
  },
  "&.growth": {
    "& .stat-icon": {
      color: theme.palette.success.main,
    },
    "& .stat-value": {
      color: theme.palette.success.main,
    },
  },
  "&.decline": {
    "& .stat-icon": {
      color: theme.palette.error.main,
    },
    "& .stat-value": {
      color: theme.palette.error.main,
    },
  },
  "&.completion": {
    "& .stat-icon": {
      color: theme.palette.secondary.main,
    },
    "& .stat-value": {
      color: theme.palette.secondary.main,
    },
  },
}));

/**
 * A reusable statistics card component that displays project statistics
 * @param {OverviewStatsProps} props - The component props
 * @returns {React.ReactElement} The rendered OverviewStats component
 */
export default function OverviewStats({
  totalViews = 0,
  viewsThisMonth = 0,
  locales = 0,
  completionRate = 0,
}) {
  const { t } = useTranslation();

  // Predefined stats configuration in the desired order
  const predefinedStats = [
    {
      title: t("dashboard.overviewStats.totalTourVisits"),
      value: totalViews,
      icon: "visibility",
      class: "total-views",
    },
    {
      title: t("dashboard.overviewStats.visitsThisMonth"),
      value: viewsThisMonth,
      icon: "chart",
      class: "monthly-views",
    },
    {
      title: t("dashboard.overviewStats.completionRate"),
      value: `${completionRate}%`,
      icon: "time",
      class: "completion",
      color: "#7b1fa2",
      textColor: "#7b1fa2",
    },
    {
      title: t("dashboard.overviewStats.supportedLanguages"),
      value: locales,
      icon: icons.language,
      class: "growth",
    },
  ];

  return (
    <DashboardCardStyled title={t("dashboard.overviewStats.title")}>
      <StatsGrid>
        {predefinedStats.map((stat, index) => (
          <StatItem key={index}>
            <StatValue className={stat.class}>
              <EurekaIcon name={stat.icon} className="stat-icon" />
              <Typography variant="h4" className="stat-value">
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </Typography>
            </StatValue>

            <Typography
              variant="body1"
              color="text.secondary"
              noWrap
              title={stat.title}
            >
              {stat.title}
            </Typography>
          </StatItem>
        ))}
      </StatsGrid>
    </DashboardCardStyled>
  );
}
