import { useLocation, useNavigate } from "react-router";

/**
 * Hook for managing tabs using full URL paths.
 * Each tab's value property contains the complete URL path for that tab.
 *
 * @param {Array<{ value: string, label: string }>} tabs - Array of tab objects where value is the full URL path
 * @param {string} [defaultTabPath] - Default tab path to redirect to if current path doesn't match any tab
 * @returns {{
 *   tabs: Array<{ value: string, label: string }>,
 *   activeTab: string,
 *   setActiveTab: (event: React.SyntheticEvent | string, value?: string) => void
 * }} Object containing tabs, activeTab, and setActiveTab function.
 */
const useUrlTabs = (tabs, defaultTabPath) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find the current active tab by matching the current pathname with tab values
  const activeTab =
    tabs.find((tab) => location.pathname.startsWith(tab.value))?.value ||
    defaultTabPath ||
    tabs[0]?.value;

  /**
   * Navigate to a new tab using its full URL path
   * @param {Event|string} event - Event object or tab value string
   * @param {string} value - Tab value (full URL path) when called from MUI Tabs component
   */
  const setActiveTab = (event, value) => {
    // Handle both direct calls and MUI Tabs onChange format
    const tabPath = value != null ? value : event;

    // Navigate to the full URL path, preserving any search parameters
    const newUrl = `${tabPath}${location.search}`;
    navigate(newUrl);
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
  };
};

export default useUrlTabs;
