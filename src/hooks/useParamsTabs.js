import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";

/**
 * Hook for managing tabs using URL search parameters
 * Changes the URL to include the tab name as a query parameter (e.g., ?tab=info, ?tab=pois)
 *
 * @param {Array} tabs - Array of tab objects with value properties
 * @param {string} initialTab - Default tab to use when no tab parameter is specified in URL
 * @param {string} paramName - URL parameter name to use for the tab (default: 'tab')
 * @returns {{tabs: Array, activeTab: string, activeTabIndex: number, setActiveTab: function, goToNextTab: function, goToPreviousTab: function}} Object containing tabs, activeTab, setActiveTab, goToNextTab, and goToPreviousTab functions
 */
const useParamsTabs = (paramName = "tab", tabs, initialTab) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current tab from search parameters
  const activeTab = searchParams.get(paramName) || initialTab;
  const activeTabIndex = tabs?.findIndex((tab) => tab.value === activeTab);

  // If no tab is set in URL, use the initialTab
  useEffect(() => {
    const tabFromParams = searchParams.get(paramName);
    if (!tabFromParams && initialTab) {
      setSearchParams((prev) => ({ ...prev, [paramName]: initialTab }), {
        replace: true,
      });
    }
  }, [initialTab, paramName, setSearchParams, searchParams]);

  /**
   * Navigate to a new tab by changing the URL search parameter
   * @param {Event|string} event - Event object or tab value string
   * @param {string} value - Tab value (when called from MUI Tabs component)
   */
  const setActiveTab = useCallback(
    (event, value) => {
      // Handle both direct calls and MUI Tabs onChange format
      const tabValue = value != null ? value : event;

      setSearchParams((prev) => ({ ...prev, [paramName]: tabValue }));
    },
    [paramName, setSearchParams],
  );

  /**
   * Go to the next tab
   * @returns {void}
   */
  const goToNextTab = () => {
    const nextTab = tabs?.[activeTabIndex + 1];
    if (nextTab) {
      setActiveTab(null, nextTab.value);
    }
  };

  /**
   * Go to the previous tab
   * @returns {void}
   */
  const goToPreviousTab = () => {
    const previousTab = tabs?.[activeTabIndex - 1];
    if (previousTab) {
      setActiveTab(null, previousTab.value);
    }
  };

  return {
    tabs,
    activeTab,
    activeTabIndex,
    setActiveTab,
    goToNextTab,
    goToPreviousTab,
  };
};

export default useParamsTabs;
