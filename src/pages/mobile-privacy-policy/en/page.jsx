const sections = [
  {
    title: "1. Introduction",
    content: `The Eureka3D-XR AR Tour Experience mobile application (thereafter referenced as the App) is bound by the European Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation – GDPR). The app is compliant with any Law and/or Regulation implemented or enacted in accordance with the GDPR and the legislation on the protection of electronic privacy, or any law which modifies, replaces, adopts or codifies any of the above laws, as well as any other applicable national laws on the processing of personal data and privacy, as they may exist under applicable law.`,
  },
  {
    title: "2. No Collection of Personal Data",
    content: `The App does not collect, store, process, or transmit any personal data as defined under the General Data Protection Regulation (EU) 2016/679 ("GDPR").`,
    bullets: [
      "We do not require user registration.",
      "We do not collect names, email addresses, or contact details.",
      "We do not collect device identifiers that can be linked to individuals.",
      "We do not track user behavior or usage for profiling purposes.",
    ],
  },
  {
    title: "3. No Data Sharing",
    content: `Since no personal data is collected, no personal data is shared with third parties, including:`,
    bullets: ["Service providers", "Analytics platforms", "Advertisers"],
    footer: `The app makes FETCH API calls to read data from the Eureka3D-XR AR Tour Builder (http://artourbuilder.eureka3dxr.fedcloud.eu) service, but these interactions do not, in any way, transfer/transmit or disclose any personal data. No personal data is collected or transferred outside the European Economic Area (EEA).`,
  },
  {
    title: "4. Third-Party Services",
    content: `The App does not integrate third-party services that process personal data (such as analytics, advertising SDKs, or tracking tools). If this changes in the future, this policy will be updated accordingly.`,
  },
  {
    title: "5. Cookies and Tracking Technologies",
    content: `The App does not use cookies or similar tracking technologies.`,
  },
  {
    title: "6. Data Security",
    content: `Although the App does not process personal data, we apply appropriate technical and organizational measures to ensure the App operates securely and reliably.`,
  },
  {
    title: "7. User Rights under GDPR",
    content: `Under the GDPR, users have rights such as access, rectification, erasure, and restriction of processing. However, since the App does not process personal data, these rights are not applicable in practice.`,
  },
];

function PrivacyPolicyEnPage() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "48px 24px",
        fontFamily: "sans-serif",
        color: "#1a1a1a",
        lineHeight: "1.7",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
        Personal Data Protection Policy
      </h1>

      <div style={{ marginBottom: "32px", color: "#555" }}>
        <p style={{ margin: "4px 0" }}>
          <strong>Data Controller:</strong> National Technical University of
          Athens
        </p>
        <p style={{ margin: "4px 0" }}>
          <strong>Contact:</strong> Eirini Kaldeli —{" "}
          <a href="mailto:kaldeli@gmail.com" style={{ color: "#1976d2" }}>
            kaldeli@gmail.com
          </a>
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.title} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>
            {section.title}
          </h2>
          {section.content && (
            <p style={{ margin: "0 0 12px" }}>{section.content}</p>
          )}
          {section.bullets && (
            <ul style={{ margin: "0 0 12px", paddingLeft: "24px" }}>
              {section.bullets.map((item) => (
                <li key={item} style={{ marginBottom: "4px" }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.footer && <p style={{ margin: "0" }}>{section.footer}</p>}
        </section>
      ))}
    </div>
  );
}

export default PrivacyPolicyEnPage;
