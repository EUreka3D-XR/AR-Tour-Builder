import { useLocation, useNavigate } from "react-router";

/**
 * Hook for managing tabs using URL paths instead of hash fragments.
 * Changes the URL to include the tab name as a path segment (e.g., /info, /pois).
 *
 * @param {Array<{ value: string }>} tabs - Array of tab objects with value properties.
 * @param {string} [initialTab="info"] - Default tab to use when no tab is specified in URL.
 * @returns {{
 *   tabs: Array<{ value: string }>,
 *   activeTab: string,
 *   setActiveTab: (event: React.SyntheticEvent | string, value?: string) => void
 * }} Object containing tabs, activeTab, and setActiveTab function.
 */
const useUrlTabs = (tabs, initialTab = "info") => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentTab = pathSegments[pathSegments.length - 1];

  // Check if the current path segment is a valid tab
  const activeTab = currentTab ?? initialTab;

  const setActiveTab = (event, value) => {
    // Handle both direct calls and MUI Tabs onChange format
    const tabValue = value != null ? value : event;

    // Build the new URL by replacing the last path segment with the new tab
    const pathWithoutTab = pathSegments.slice(0, -1);
    const newPath = `/${pathWithoutTab.join("/")}/${tabValue}`;
    const newUrl = `${newPath}${location.search}`;

    console.log(newUrl);

    navigate(newUrl);
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
  };
};

export default useUrlTabs;
