const sections = [
  {
    title: "1. Introduction",
    content: `L'application mobile Eureka3D-XR AR Tour Experience (ci-après désignée « l'Application ») est soumise au Règlement européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données (Règlement général sur la protection des données – RGPD). L'application est conforme à toute loi et/ou réglementation mise en œuvre ou adoptée conformément au RGPD et à la législation sur la protection de la vie privée électronique, ou à toute loi qui modifie, remplace, adopte ou codifie l'une des lois susmentionnées, ainsi qu'à toute autre loi nationale applicable en matière de traitement des données personnelles et de protection de la vie privée.`,
  },
  {
    title: "2. Données personnelles traitées",
    content: `L'Application traite la catégorie suivante de données à caractère personnel au sens du Règlement général sur la protection des données (UE) 2016/679 (« RGPD ») :`,
    bullets: [
      "Localisation de l'appareil (coordonnées GPS) — collectée en temps réel pendant l'utilisation active de l'Application.",
    ],
    footer: `L'Application ne collecte, ne stocke, ne traite ni ne transmet aucune autre donnée personnelle. Nous n'exigeons pas d'inscription, nous ne collectons pas de noms, d'adresses e-mail, de coordonnées ou d'identifiants d'appareils pouvant être liés à des personnes, et nous ne suivons pas le comportement des utilisateurs à des fins de profilage.`,
  },
  {
    title: "3. Données de localisation — Finalité, base légale et conservation",
    content: `L'Application demande l'accès à la localisation précise de l'appareil (au premier plan uniquement) aux fins suivantes :`,
    bullets: [
      "Navigation dans les visites guidées : afficher la position en temps réel de l'utilisateur sur la carte de la visite et fournir une orientation entre les points d'intérêt.",
      "Positionnement en réalité augmentée (RA) : ancrer et positionner correctement les modèles 3D dans l'espace physique lors des expériences en RA.",
    ],
    footer: `Base légale : Article 6(1)(a) du RGPD — consentement. L'accès à la localisation est accordé par l'utilisateur via la demande d'autorisation du système d'exploitation et peut être révoqué à tout moment dans les paramètres de l'appareil. Les données de localisation sont traitées exclusivement sur l'appareil et ne sont jamais transmises, stockées ou partagées avec un serveur ou un tiers. Aucune donnée de localisation n'est conservée après la fin de la session.`,
  },
  {
    title: "4. Absence de partage de données",
    content: `Les données de localisation et toute autre donnée traitée par l'Application ne sont pas partagées avec des tiers, notamment :`,
    bullets: [
      "Prestataires de services",
      "Plateformes d'analyse",
      "Annonceurs",
    ],
    footer: `L'application effectue des appels API vers le service Eureka3D-XR AR Tour Builder (http://artourbuilder.eureka3dxr.fedcloud.eu), mais ces interactions ne transfèrent, ne transmettent ni ne divulguent aucune donnée personnelle. Aucune donnée personnelle n'est collectée ou transférée en dehors de l'Espace économique européen (EEE).`,
  },
  {
    title: "5. Services tiers",
    content: `L'Application n'intègre pas de services tiers traitant des données personnelles (tels que des outils d'analyse, des SDK publicitaires ou des outils de suivi). Si cela venait à changer à l'avenir, cette politique serait mise à jour en conséquence.`,
  },
  {
    title: "6. Cookies et technologies de suivi",
    content: `L'Application n'utilise pas de cookies ni de technologies de suivi similaires.`,
  },
  {
    title: "7. Sécurité des données",
    content: `Nous appliquons des mesures techniques et organisationnelles appropriées pour garantir que l'Application fonctionne de manière sécurisée et fiable, et pour protéger les données de localisation traitées sur l'appareil.`,
  },
  {
    title: "8. Droits des utilisateurs au titre du RGPD",
    content: `En vertu du RGPD, les utilisateurs ont le droit d'accéder à leurs données personnelles, de les rectifier, de les effacer, d'en limiter le traitement, de retirer leur consentement et d'introduire une réclamation auprès d'une autorité de contrôle. Les données de localisation étant traitées exclusivement sur l'appareil en temps réel et n'étant jamais stockées ni transmises, il n'existe aucune donnée conservée à consulter, rectifier ou effacer. Vous pouvez exercer votre droit de retrait du consentement à tout moment en révoquant l'autorisation de localisation dans les paramètres de votre appareil. Pour toute question relative à la protection des données, veuillez contacter le responsable du traitement à l'adresse indiquée ci-dessus.`,
  },
];

function PrivacyPolicyFrPage() {
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
        Politique de protection des données personnelles
      </h1>

      <div style={{ marginBottom: "32px", color: "#555" }}>
        <p style={{ margin: "4px 0" }}>
          <strong>Responsable du traitement :</strong> Université polytechnique nationale d&apos;Athènes
        </p>
        <p style={{ margin: "4px 0" }}>
          <strong>Contact :</strong> Eirini Kaldeli —{" "}
          <a href="mailto:kaldeli@gmail.com" style={{ color: "#1976d2" }}>
            kaldeli@gmail.com
          </a>
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.title} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>{section.title}</h2>
          {section.content && <p style={{ margin: "0 0 12px" }}>{section.content}</p>}
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

export default PrivacyPolicyFrPage;
