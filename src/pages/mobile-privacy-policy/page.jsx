import { Navigate } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";

const SUPPORTED_LOCALES = ["en", "fr"];

function MobilePrivacyPolicyIndexPage() {
  const locale = useLocale();
  const lang = SUPPORTED_LOCALES.includes(locale) ? locale : "en";

  return <Navigate to={`/mobile-privacy-policy/${lang}`} replace />;
}

export default MobilePrivacyPolicyIndexPage;
