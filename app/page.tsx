import Link from "next/link";

const experiments = [
  {
    href: "/exp1",
    label: "exp1",
    title: "Hero text reveal",
    description: "Clip-path word stagger on load. Dark background, accent detail, secondary CTA.",
  },
  {
    href: "/exp2",
    label: "exp2",
    title: "Landing larga — The NEAR Stack",
    description: "Scroll pinning con 6 slides del stack real de NEAR, contadores animados ($19B, 1M TPS), grid de integraciones con stagger, quote + CTA accent.",
  },
  {
    href: "/exp3",
    label: "exp3",
    title: "Ecosystem — grid de proyectos reales",
    description: "30+ proyectos reales de nearcatalog.xyz. ScrollTrigger.batch por categoría, showcase horizontal atado al scroll vertical, marquee de nombres con pausa en hover.",
  },
  {
    href: "/exp4",
    label: "exp4",
    title: "Blog — Confidential Intents (Feb 2026)",
    description: "Artículo real de near.org. Barra de progreso de lectura fija, divisores SVG line-draw, 5 técnicas distintas de reveal por heading, pull quote con acento.",
  },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-text-on-dark)",
        padding: "80px var(--section-padding-h)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-family-secondary)",
          fontSize: "var(--font-size-small)",
          color: "var(--color-accent)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "24px",
          fontWeight: 600,
        }}
      >
        near.org — motion R&D
      </p>

      <h1
        style={{
          fontSize: "var(--font-size-h1-page)",
          lineHeight: "var(--line-height-h1-page)",
          fontWeight: "var(--font-weight-h1-page)" as React.CSSProperties["fontWeight"],
          maxWidth: "600px",
          marginBottom: "80px",
        }}
      >
        Animation experiments
      </h1>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          borderTop: "1px solid var(--color-border-dark)",
          maxWidth: "var(--content-max-width)",
        }}
      >
        {experiments.map((exp) => (
          <li
            key={exp.href}
            style={{ borderBottom: "1px solid var(--color-border-dark)" }}
          >
            <Link
              href={exp.href}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "32px",
                padding: "24px 0",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-secondary)",
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                  minWidth: "48px",
                  fontWeight: 500,
                }}
              >
                {exp.label}
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: "var(--font-size-h2-article)",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  {exp.title}
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {exp.description}
                </span>
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--color-accent)",
                  fontSize: "20px",
                }}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
