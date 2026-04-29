const sections = [
  {
    title: "1. Introduction",
    content: `L'application mobile Eureka3D-XR AR Tour Experience (ci-après désignée « l'Application ») est soumise au Règlement européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données (Règlement général sur la protection des données – RGPD). L'application est conforme à toute loi et/ou réglementation mise en œuvre ou adoptée conformément au RGPD et à la législation sur la protection de la vie privée électronique, ou à toute loi qui modifie, remplace, adopte ou codifie l'une des lois susmentionnées, ainsi qu'à toute autre loi nationale applicable en matière de traitement des données personnelles et de protection de la vie privée.`,
  },
  {
    title: "2. Absence de collecte de données personnelles",
    content: `L'Application ne collecte, ne stocke, ne traite ni ne transmet aucune donnée à caractère personnel au sens du Règlement général sur la protection des données (UE) 2016/679 (« RGPD »).`,
    bullets: [
      "Nous n'exigeons pas d'inscription de l'utilisateur.",
      "Nous ne collectons pas de noms, adresses e-mail ou coordonnées.",
      "Nous ne collectons pas d'identifiants d'appareils pouvant être liés à des personnes.",
      "Nous ne suivons pas le comportement des utilisateurs à des fins de profilage.",
    ],
  },
  {
    title: "3. Absence de partage de données",
    content: `Étant donné qu'aucune donnée personnelle n'est collectée, aucune donnée personnelle n'est partagée avec des tiers, notamment :`,
    bullets: [
      "Prestataires de services",
      "Plateformes d'analyse",
      "Annonceurs",
    ],
    footer: `L'application effectue des appels API vers le service Eureka3D-XR AR Tour Builder (http://artourbuilder.eureka3dxr.fedcloud.eu), mais ces interactions ne transfèrent, ne transmettent ni ne divulguent aucune donnée personnelle. Aucune donnée personnelle n'est collectée ou transférée en dehors de l'Espace économique européen (EEE).`,
  },
  {
    title: "4. Services tiers",
    content: `L'Application n'intègre pas de services tiers traitant des données personnelles (tels que des outils d'analyse, des SDK publicitaires ou des outils de suivi). Si cela venait à changer à l'avenir, cette politique serait mise à jour en conséquence.`,
  },
  {
    title: "5. Cookies et technologies de suivi",
    content: `L'Application n'utilise pas de cookies ni de technologies de suivi similaires.`,
  },
  {
    title: "6. Sécurité des données",
    content: `Bien que l'Application ne traite pas de données personnelles, nous appliquons des mesures techniques et organisationnelles appropriées pour garantir que l'Application fonctionne de manière sécurisée et fiable.`,
  },
  {
    title: "7. Droits des utilisateurs au titre du RGPD",
    content: `En vertu du RGPD, les utilisateurs disposent de droits tels que l'accès, la rectification, l'effacement et la limitation du traitement. Cependant, étant donné que l'Application ne traite pas de données personnelles, ces droits ne sont pas applicables en pratique.`,
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
