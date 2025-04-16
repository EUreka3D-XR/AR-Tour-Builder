import { useState } from "react";

export const useTabs = (tabs, initialTab) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs?.[0]?.value);

  return { activeTab, setActiveTab, tabs };
};
