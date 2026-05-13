/** Inline SVG logo marks for each fictional company.
 *  Each renders an icon + wordmark and inherits color from parent via `currentColor`.
 */

export function ArchformLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Arch / portal shape */}
        <path d="M3 18 L3 10 C3 5.6 6.1 3 10 3 C13.9 3 17 5.6 17 10 L17 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="1" y1="18" x2="5.5" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="14.5" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        {/* Keystone dot */}
        <circle cx="10" cy="7" r="1.2" fill="currentColor"/>
      </svg>
      <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        Archform
      </span>
    </div>
  );
}

export function LumenAILogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagon */}
        <polygon
          points="10,1.5 17.2,5.5 17.2,13.5 10,17.5 2.8,13.5 2.8,5.5"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        {/* Inner spark, 4 short lines radiating from center */}
        <circle cx="10" cy="9.5" r="1.8" fill="currentColor"/>
        <line x1="10" y1="5" x2="10" y2="3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="14.2" y1="7" x2="15.4" y2="6.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="14.2" y1="12" x2="15.4" y2="12.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="10" y1="14" x2="10" y2="15.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="5.8" y1="12" x2="4.6" y2="12.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="5.8" y1="7" x2="4.6" y2="6.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
      <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        Lumen AI
      </span>
    </div>
  );
}

export function StackwellLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Three stacked rounded bars, each narrower */}
        <rect x="1" y="3.5" width="18" height="3.5" rx="1.75"/>
        <rect x="3" y="8.5" width="14" height="3.5" rx="1.75"/>
        <rect x="5.5" y="13.5" width="9" height="3.5" rx="1.75"/>
      </svg>
      <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        Stackwell
      </span>
    </div>
  );
}

export function BravoHealthLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded medical cross */}
        <rect x="7.5" y="1.5" width="5" height="17" rx="2.5"/>
        <rect x="1.5" y="7.5" width="17" height="5" rx="2.5"/>
      </svg>
      <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        Bravo Health
      </span>
    </div>
  );
}

export function FynanceLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Step-up chart */}
        <polyline
          points="2,17 2,13 6,13 6,9.5 10,9.5 10,6 14,6 14,2.5 18,2.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Baseline */}
        <line x1="1" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        {/* Arrow tip */}
        <path d="M15.5 1.5 L18 2.5 L16.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        Fynance
      </span>
    </div>
  );
}

export function CrudoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="10" cy="10" r="8.3" stroke="currentColor" strokeWidth="1.4"/>
        {/* Inner filled circle */}
        <circle cx="10" cy="10" r="2.8" fill="currentColor"/>
        {/* 4 cardinal dots */}
        <circle cx="10" cy="3.2" r="1.1" fill="currentColor"/>
        <circle cx="10" cy="16.8" r="1.1" fill="currentColor"/>
        <circle cx="3.2" cy="10" r="1.1" fill="currentColor"/>
        <circle cx="16.8" cy="10" r="1.1" fill="currentColor"/>
      </svg>
      <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        Crudo
      </span>
    </div>
  );
}
