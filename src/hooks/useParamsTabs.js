import { useEffect } from "react";
import { useSearchParams } from "react-router";

/**
 * Hook for managing tabs using URL search parameters
 * Changes the URL to include the tab name as a query parameter (e.g., ?tab=info, ?tab=pois)
 *
 * @param {Array} tabs - Array of tab objects with value properties
 * @param {string} initialTab - Default tab to use when no tab parameter is specified in URL
 * @param {string} paramName - URL parameter name to use for the tab (default: 'tab')
 * @returns {Object} Object containing tabs, activeTab, and setActiveTab function
 */
const useParamsTabs = (paramName = "tab", tabs, initialTab) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current tab from search parameters
  const activeTab = searchParams.get(paramName) || initialTab;

  // If no tab is set in URL, use the initialTab
  useEffect(() => {
    const tabFromParams = searchParams.get(paramName);
    if (!tabFromParams && initialTab) {
      setSearchParams({ [paramName]: initialTab }, { replace: true });
    }
  }, [initialTab, paramName, setSearchParams, searchParams]);

  /**
   * Navigate to a new tab by changing the URL search parameter
   * @param {Event|string} event - Event object or tab value string
   * @param {string} value - Tab value (when called from MUI Tabs component)
   */
  const setActiveTab = (event, value) => {
    // Handle both direct calls and MUI Tabs onChange format
    const tabValue = value != null ? value : event;

    setSearchParams({ [paramName]: tabValue });
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
  };
};

export default useParamsTabs;
