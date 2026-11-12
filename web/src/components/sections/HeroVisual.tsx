import Image from "next/image";
import Link from "next/link";
import { siteConfig, type Locale } from "@/config/site";
import type { ServiceId } from "@/config/service-slugs";
import { services } from "@/content/services";
import { servicePath } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { ArcMotif } from "@/components/ui/ArcMotif";

/*
 * Ilustraciones originales (SVG) de cada servicio, en la paleta de Blanchard Group LLC.
 * Sin fotos de terceros: no hay derechos de imagen ni créditos, y se ven nítidas en cualquier pantalla.
 */
const NAVY = "#041b3c";
const DEEP = "#082650";
const STEEL = "#123a70";
const GOLD = "#b78b40";
const GOLD_LIGHT = "#dcb35c";
const GOLD_TINT = "#f4ead6";
const MIST = "#e1e5eb";

const svgProps = { viewBox: "26 6 188 138", fill: "none", "aria-hidden": true, focusable: false, className: "h-auto w-full" } as const;

function IllTaxes() {
  return (
    <svg {...svgProps}>
      <rect x="74" y="10" width="92" height="132" rx="8" fill="#fff" stroke={NAVY} strokeWidth="3" />
      <rect x="86" y="22" width="44" height="8" rx="4" fill={NAVY} />
      {[46, 64, 82].map((y) => (
        <g key={y}>
          <rect x="86" y={y - 5} width="10" height="10" rx="2" stroke={GOLD} strokeWidth="2.5" />
          <rect x="104" y={y - 1.5} width="50" height="3" rx="1.5" fill={MIST} />
        </g>
      ))}
      <path d="M88 46l3 3 6-7M88 64l3 3 6-7" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="86" y="100" width="68" height="26" rx="6" fill={GOLD_TINT} stroke={GOLD} strokeWidth="2" />
      <rect x="96" y="108" width="28" height="4" rx="2" fill={GOLD} />
      <rect x="96" y="116" width="44" height="4" rx="2" fill={GOLD_LIGHT} />
      <circle cx="170" cy="32" r="16" fill={GOLD} />
      <path d="M162 32l6 6 10-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllCorporate() {
  const win = (x: number, y: number) => <rect key={`${x}-${y}`} x={x} y={y} width="9" height="7" rx="1.5" fill="#fff" opacity=".6" />;
  return (
    <svg {...svgProps}>
      <rect x="50" y="62" width="44" height="78" rx="3" fill={DEEP} stroke={GOLD_LIGHT} strokeWidth="2.5" />
      <rect x="98" y="24" width="52" height="116" rx="3" fill={STEEL} stroke={GOLD_LIGHT} strokeWidth="2.5" />
      <rect x="154" y="76" width="36" height="64" rx="3" fill={DEEP} stroke={GOLD_LIGHT} strokeWidth="2.5" />
      {[74, 90, 106, 122].flatMap((y) => [58, 76].map((x) => win(x, y)))}
      {[36, 52, 68, 84, 100, 116].flatMap((y) => [108, 126].map((x) => win(x, y)))}
      {[88, 104, 120].flatMap((y) => [162, 175].map((x) => win(x, y)))}
      <path d="M34 140h172" stroke={GOLD_LIGHT} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M36 104l40-16 26 8 46-40" stroke={GOLD_LIGHT} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M134 46l14-4-3 14z" fill={GOLD_LIGHT} />
    </svg>
  );
}

function IllFormation() {
  return (
    <svg {...svgProps}>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={56 + i * 21.33} y="38" width="21.33" height="24" fill={i % 2 ? GOLD_LIGHT : "#fff"} />
      ))}
      <rect x="56" y="38" width="128" height="24" rx="3" stroke={NAVY} strokeWidth="2.5" />
      <rect x="62" y="62" width="116" height="78" fill="#fff" />
      <rect x="106" y="88" width="28" height="52" fill={NAVY} />
      <circle cx="128" cy="116" r="2.5" fill={GOLD_LIGHT} />
      <rect x="72" y="80" width="26" height="26" rx="2" fill={MIST} stroke={NAVY} strokeWidth="2" />
      <rect x="142" y="80" width="26" height="26" rx="2" fill={MIST} stroke={NAVY} strokeWidth="2" />
      <path d="M30 140h180" stroke={GOLD_LIGHT} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M182 56l-4 22 12-7 12 7-4-22z" fill={GOLD} />
      <circle cx="190" cy="42" r="16" fill={GOLD} stroke="#fff" strokeWidth="3" />
      <path d="M190 33l3 6.5 7 .8-5.2 4.8 1.5 7-6.3-3.6-6.3 3.6 1.5-7-5.2-4.8 7-.8z" fill="#fff" />
    </svg>
  );
}

function IllItin() {
  return (
    <svg {...svgProps}>
      <rect x="38" y="26" width="164" height="98" rx="10" fill="#fff" stroke={NAVY} strokeWidth="3" />
      <rect x="52" y="40" width="52" height="52" rx="6" fill={MIST} />
      <circle cx="78" cy="59" r="11" fill={STEEL} />
      <path d="M57 92c2-14 12-18 21-18s19 4 21 18z" fill={STEEL} />
      <rect x="116" y="42" width="70" height="7" rx="3.5" fill={NAVY} />
      <rect x="116" y="57" width="54" height="4" rx="2" fill={MIST} />
      <rect x="116" y="68" width="62" height="4" rx="2" fill={MIST} />
      <rect x="116" y="79" width="40" height="4" rx="2" fill={MIST} />
      <path d="M38 102h164v12a10 10 0 0 1-10 10H48a10 10 0 0 1-10-10z" fill={GOLD} />
      <rect x="52" y="109" width="62" height="4" rx="2" fill="#fff" opacity=".85" />
      <circle cx="196" cy="30" r="15" fill={NAVY} stroke="#fff" strokeWidth="3" />
      <path d="M189 30l5 5 9-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllLife() {
  return (
    <svg {...svgProps}>
      <circle cx="120" cy="78" r="64" fill={GOLD_TINT} />
      <path d="M120 12l52 18v46c0 32-22 52-52 66-30-14-52-34-52-66V30z" fill={NAVY} />
      <path d="M120 24l40 14v38c0 24-16 40-40 52-24-12-40-28-40-52V38z" stroke={GOLD} strokeWidth="2" />
      <path d="M120 102C98 86 94 68 106 62c7-3 14 2 14 7 0-5 7-10 14-7 12 6 8 24-14 40z" fill={GOLD_LIGHT} />
    </svg>
  );
}

function IllHealth() {
  return (
    <svg {...svgProps}>
      <rect x="40" y="30" width="160" height="96" rx="10" fill="#fff" />
      <circle cx="82" cy="70" r="24" fill={GOLD} />
      <rect x="78" y="58" width="8" height="24" rx="2" fill="#fff" />
      <rect x="70" y="66" width="24" height="8" rx="2" fill="#fff" />
      <rect x="118" y="48" width="66" height="7" rx="3.5" fill={NAVY} />
      <rect x="118" y="62" width="48" height="4" rx="2" fill={MIST} />
      <path d="M54 106h40l8-12 10 26 10-20 6 6h36" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Tile = { id: ServiceId; tone: "light" | "dark"; Art: () => React.JSX.Element };

// Tablero alterno claro/oscuro; la columna derecha baja un poco para dar ritmo.
const tiles: Tile[] = [
  { id: "taxes-individuales", tone: "light", Art: IllTaxes },
  { id: "taxes-corporativos", tone: "dark", Art: IllCorporate },
  { id: "creacion-de-empresas", tone: "dark", Art: IllFormation },
  { id: "itin", tone: "light", Art: IllItin },
  { id: "seguros-de-vida", tone: "light", Art: IllLife },
  { id: "seguros-de-salud", tone: "dark", Art: IllHealth },
];

/** Radio del anillo de tarjetas en % del lienzo (el aro interior del ArcMotif mide 23 %): los centros quedan sobre esa línea. */
const ORBIT = 24;

/**
 * Las seis ilustraciones dentro del círculo de aros del logo (solo escritorio): forman un anillo sobre la línea del aro
 * interior, con el logo original en el centro. Todo se mide en % del lienzo, de modo que escala con el círculo y ninguna
 * tarjeta se sale del aro exterior. Al pasar el mouse (o enfocar con teclado) la tarjeta "salta" como si se seleccionara;
 * cada una abre la página de su servicio.
 */
export function HeroVisual({ locale }: { locale: Locale }) {
  return (
    // El lienzo del SVG es 17,6 % más ancho que la columna (el aro mide 85 % del lienzo) y se centra con margen negativo.
    <div className="relative hidden w-[117.6%] -ml-[8.8%] lg:block">
      <div className="relative aspect-square">
        <ArcMotif className="absolute inset-0 size-full" />

        {/* Logo original (sin recortar ni deformar) dentro de un medallón blanco */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[21.5%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white shadow-[0_14px_30px_-16px_rgba(4,27,60,0.55)] ring-1 ring-gold/50">
          <Image src={siteConfig.logo.src} alt="" fill sizes="170px" className="object-contain p-[7%]" />
        </div>

        <ul data-hero-tiles className="absolute inset-0">
          {tiles.map(({ id, tone, Art }, i) => {
            const service = services.find((s) => s.id === id)!;
            const dark = tone === "dark";
            const angle = ((-90 + 60 * i) * Math.PI) / 180; // empieza arriba y sigue en el sentido del reloj
            return (
              <li
                key={id}
                style={{ left: `${50 + ORBIT * Math.cos(angle)}%`, top: `${50 + ORBIT * Math.sin(angle)}%` }}
                className="absolute w-[17%] -translate-x-1/2 -translate-y-1/2 hover:z-20 focus-within:z-20"
              >
                <Link
                  href={servicePath(locale, id)}
                  title={service.name[locale]}
                  className={cn(
                    "group flex aspect-[1/1.06] w-full flex-col items-center justify-center rounded-2xl border p-[6%] shadow-[0_6px_16px_-10px_rgba(4,27,60,0.5)] transition-all duration-300 ease-out will-change-transform",
                    "hover:-translate-y-2 hover:scale-[1.15] hover:rotate-[2deg] hover:border-gold hover:shadow-[0_28px_44px_-18px_rgba(4,27,60,0.65)]",
                    "focus-visible:-translate-y-2 focus-visible:scale-[1.15] focus-visible:rotate-[2deg] focus-visible:border-gold focus-visible:shadow-[0_28px_44px_-18px_rgba(4,27,60,0.65)]",
                    dark ? "border-navy bg-navy" : "border-line bg-white",
                  )}
                >
                  <span className="block w-full transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105">
                    <Art />
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-center text-[10.5px] font-semibold leading-tight max-xl:sr-only",
                      dark ? "text-white" : "text-navy",
                    )}
                  >
                    {service.name[locale]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
