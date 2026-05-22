const sections = [
  {
    title: "1. Introduction",
    content: `The Eureka3D-XR AR Tour Experience mobile application (thereafter referenced as the App) is bound by the European Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation – GDPR). The app is compliant with any Law and/or Regulation implemented or enacted in accordance with the GDPR and the legislation on the protection of electronic privacy, or any law which modifies, replaces, adopts or codifies any of the above laws, as well as any other applicable national laws on the processing of personal data and privacy, as they may exist under applicable law.`,
  },
  {
    title: "2. Personal Data Processed",
    content: `The App processes the following category of personal data as defined under the General Data Protection Regulation (EU) 2016/679 ("GDPR"):`,
    bullets: [
      "Device location (GPS coordinates) — collected in real time while the App is in active use.",
    ],
    footer: `The App does not collect, store, process, or transmit any other personal data. We do not require user registration, collect names, email addresses, contact details, or device identifiers that can be linked to individuals, and we do not track user behavior or usage for profiling purposes.`,
  },
  {
    title: "3. Location Data — Purpose, Legal Basis, and Retention",
    content: `The App requests access to the device's precise location (foreground only) for the following purposes:`,
    bullets: [
      "Tour navigation: to display the user's real-time position on the tour map and provide directional guidance between points of interest.",
      "Augmented Reality (AR) positioning: to anchor and correctly place 3D models in physical space during AR experiences.",
    ],
    footer: `Legal basis: Article 6(1)(a) GDPR — consent. Location access is granted by the user via the operating system permission prompt and can be revoked at any time through the device settings. Location data is processed exclusively on-device and is never transmitted to, stored on, or shared with any server or third party. No location data is retained after the session ends.`,
  },
  {
    title: "4. No Data Sharing",
    content: `Location data and any other data processed by the App are not shared with third parties, including:`,
    bullets: ["Service providers", "Analytics platforms", "Advertisers"],
    footer: `The App makes FETCH API calls to read data from the Eureka3D-XR AR Tour Builder (http://artourbuilder.eureka3dxr.fedcloud.eu) service, but these interactions do not transfer, transmit, or disclose any personal data. No personal data is collected or transferred outside the European Economic Area (EEA).`,
  },
  {
    title: "5. Third-Party Services",
    content: `The App does not integrate third-party services that process personal data (such as analytics, advertising SDKs, or tracking tools). If this changes in the future, this policy will be updated accordingly.`,
  },
  {
    title: "6. Cookies and Tracking Technologies",
    content: `The App does not use cookies or similar tracking technologies.`,
  },
  {
    title: "7. Data Security",
    content: `Although the App does not process personal data, we apply appropriate technical and organizational measures to ensure the App operates securely and reliably.`,
  },
  {
    title: "8. User Rights under GDPR",
    content: `Under the GDPR, users have the right to access, rectify, erase, or restrict the processing of their personal data, as well as the right to withdraw consent and to lodge a complaint with a supervisory authority. Because location data is processed solely on-device and in real time, and is never stored or transmitted, there is no retained data to access, rectify, or erase. You can exercise your right to withdraw consent at any time by revoking the location permission in your device settings. For any privacy-related enquiries please contact the Data Controller at the address above.`,
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
