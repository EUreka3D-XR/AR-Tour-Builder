import { useCallback, useState } from "react";

export const useTabs = (tabs, initialTab) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs?.[0]?.value);

  const handleChange = useCallback((event, value) => {
    if (value == null) {
      setActiveTab(event);
      return;
    }
    setActiveTab(value);
  }, []);

  return { activeTab, setActiveTab: handleChange, tabs };
};
