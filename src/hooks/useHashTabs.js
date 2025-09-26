import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useHashTabs = (tabs, initialTab) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.hash.replace("#", "") || initialTab;

  const setActiveTab = (event, value) => {
    let navToUrl = `${location.pathname}${location.search}#${value}`;
    if (value == null) {
      navToUrl = `${location.pathname}${location.search}#${event}`;
    }
    navigate(navToUrl);
  };

  useEffect(() => {
    // If there's no hash in the URL, add #info
    if (!location.hash) {
      navigate(`${location.pathname}${location.search}#info`, {
        replace: true,
      });
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  return { tabs, activeTab, setActiveTab };
};

export default useHashTabs;
