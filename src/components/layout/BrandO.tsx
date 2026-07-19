/**
 * O "o" cortado da NOVACT: anel com traço em gradiente de marca e um corte
 * no quadrante superior direito. Assinatura visual usada no wordmark e como
 * marcador de link ativo. Placeholder desenhado em SVG até chegar o logótipo
 * oficial do cliente.
 *
 * O gradiente é definido uma única vez por <BrandGradientDefs /> (no layout)
 * e referenciado aqui por id — evita defs duplicados em cada instância.
 */
export function BrandO({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="url(#novact-grad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="46.5 10.05"
      />
    </svg>
  );
}

export function BrandGradientDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <linearGradient id="novact-grad" x1="0%" y1="0%" x2="100%" y2="30%">
          <stop offset="0%" stopColor="#f5822b" />
          <stop offset="45%" stopColor="#f0b44a" />
          <stop offset="100%" stopColor="#5fa8e8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
