interface AvatarProps {
  size?: number;
  border?: boolean;
}

function Wrap({
  size,
  border,
  children,
}: {
  size: number;
  border?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        ...(border ? { border: "2px solid #FAFAF7" } : {}),
      }}
    >
      {children}
    </div>
  );
}

/** Sarah K., Head of Marketing, Lumen AI */
export function AvatarSK({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm taupe background */}
        <rect width="40" height="40" fill="#C8AC98" />
        {/* Navy clothing */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#1E3655" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#F0C89A" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#F0C89A" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#F0C89A" />
        {/* Hair, auburn, sits behind head */}
        <ellipse cx="20" cy="15.5" rx="10.5" ry="11" fill="#7B3A1A" />
        {/* Head */}
        <circle cx="20" cy="16" r="8" fill="#F0C89A" />
        {/* Hair top, side-parted, covers crown */}
        <path
          d="M13 14 Q13 6.5 20 6 Q27 6.5 27 14 Q26 8.5 20 8 Q14 8.5 13 14Z"
          fill="#7B3A1A"
        />
        {/* Right side hair falls past ear */}
        <path
          d="M27.5 13 Q29.5 17 28.5 25 Q27.5 27.5 26.5 26 Q28 22 27.5 17Z"
          fill="#7B3A1A"
        />
        {/* Eyes */}
        <ellipse cx="17.2" cy="16.5" rx="1.35" ry="1.15" fill="#2C1810" />
        <ellipse cx="22.8" cy="16.5" rx="1.35" ry="1.15" fill="#2C1810" />
        <circle cx="17.6" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        <circle cx="23.2" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        {/* Eyebrows */}
        <path
          d="M15.5 14 Q17 13.1 18.8 14"
          stroke="#5C2C12"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M21.2 14 Q23 13.1 24.5 14"
          stroke="#5C2C12"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.8 22.5 21"
          stroke="#C47258"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blush */}
        <ellipse cx="14.5" cy="19.5" rx="2.2" ry="1.3" fill="#E8825A" opacity="0.2" />
        <ellipse cx="25.5" cy="19.5" rx="2.2" ry="1.3" fill="#E8825A" opacity="0.2" />
      </svg>
    </Wrap>
  );
}

/** Marcus D., Founder, Archform */
export function AvatarMD({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep navy background */}
        <rect width="40" height="40" fill="#183050" />
        {/* Charcoal blazer */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#2D3748" />
        {/* White shirt collar */}
        <path d="M17.5 30 L20 27 L22.5 30 L21.5 40 L18.5 40Z" fill="#EEE" opacity="0.92" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#9E6840" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#9E6840" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#9E6840" />
        {/* Hair, very close crop */}
        <ellipse cx="20" cy="14" rx="9" ry="9.5" fill="#1A0A04" />
        {/* Head */}
        <circle cx="20" cy="16.5" r="8" fill="#9E6840" />
        {/* Hair top, tight fade */}
        <path
          d="M12 15.5 Q12 8 20 7 Q28 8 28 15.5 Q27 10 20 8.5 Q13 10 12 15.5Z"
          fill="#1A0A04"
        />
        {/* Fade sides */}
        <path
          d="M12 14 Q11 18 12 21 Q12.5 17 12.5 15Z"
          fill="#1A0A04"
        />
        <path
          d="M28 14 Q29 18 28 21 Q27.5 17 27.5 15Z"
          fill="#1A0A04"
        />
        {/* Eyes */}
        <ellipse cx="17.2" cy="16.5" rx="1.35" ry="1.15" fill="#1A0A04" />
        <ellipse cx="22.8" cy="16.5" rx="1.35" ry="1.15" fill="#1A0A04" />
        <circle cx="17.6" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        <circle cx="23.2" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        {/* Eyebrows */}
        <path
          d="M15.5 14 Q17 13.3 18.8 14"
          stroke="#0A0402"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M21.2 14 Q23 13.3 24.5 14"
          stroke="#0A0402"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.8 22.5 21"
          stroke="#7A4A28"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Wrap>
  );
}

/** James L. */
export function AvatarJL({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Forest green background */}
        <rect width="40" height="40" fill="#2B6455" />
        {/* Blue clothing */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#254B7A" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#EDD0A8" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#EDD0A8" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#EDD0A8" />
        {/* Hair, light brown, short neat */}
        <ellipse cx="20" cy="14.5" rx="9.5" ry="9.5" fill="#7A5030" />
        {/* Head */}
        <circle cx="20" cy="16" r="8" fill="#EDD0A8" />
        {/* Hair top */}
        <path
          d="M12 14 Q12 7 20 6 Q28 7 28 14 Q27 8 20 7.5 Q13 8 12 14Z"
          fill="#7A5030"
        />
        {/* Glasses frames */}
        <rect
          x="13.5"
          y="14.5"
          width="5.2"
          height="3.8"
          rx="1.8"
          fill="none"
          stroke="#2E2010"
          strokeWidth="1"
        />
        <rect
          x="21.3"
          y="14.5"
          width="5.2"
          height="3.8"
          rx="1.8"
          fill="none"
          stroke="#2E2010"
          strokeWidth="1"
        />
        <line
          x1="18.7"
          y1="16.5"
          x2="21.3"
          y2="16.5"
          stroke="#2E2010"
          strokeWidth="0.9"
        />
        <line
          x1="13.5"
          y1="16.5"
          x2="11.5"
          y2="17"
          stroke="#2E2010"
          strokeWidth="0.9"
        />
        <line
          x1="26.5"
          y1="16.5"
          x2="28.5"
          y2="17"
          stroke="#2E2010"
          strokeWidth="0.9"
        />
        {/* Eyes */}
        <ellipse cx="16.1" cy="16.5" rx="1.15" ry="1.05" fill="#2E2010" />
        <ellipse cx="23.9" cy="16.5" rx="1.15" ry="1.05" fill="#2E2010" />
        <circle cx="16.5" cy="15.9" r="0.38" fill="white" opacity="0.75" />
        <circle cx="24.3" cy="15.9" r="0.38" fill="white" opacity="0.75" />
        {/* Eyebrows */}
        <path
          d="M14.5 13 Q16.1 12.2 17.8 13"
          stroke="#5C3818"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M22.2 13 Q23.9 12.2 25.5 13"
          stroke="#5C3818"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.8 22.5 21"
          stroke="#B48060"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Wrap>
  );
}

/** Mara Holt, Co-founder & CEO */
export function AvatarMH({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm sand background */}
        <rect width="40" height="40" fill="#C4A882" />
        {/* Slate blazer */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#455A7A" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#E8C49A" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#E8C49A" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#E8C49A" />
        {/* Hair, dark brown, shoulder-length, behind head */}
        <ellipse cx="20" cy="20" rx="12" ry="15" fill="#2E1A0C" />
        {/* Head */}
        <circle cx="20" cy="16" r="8" fill="#E8C49A" />
        {/* Hair top, parted to side */}
        <path
          d="M12 14.5 Q12.5 6.5 20 6 Q27.5 6.5 28 14.5 Q27 8.5 20 8 Q13 8.5 12 14.5Z"
          fill="#2E1A0C"
        />
        {/* Side strand left */}
        <path
          d="M12 13 Q10 17 10.5 24 Q11 27 12.5 27 Q12 23 11.5 19 Q11.5 16 12 14Z"
          fill="#2E1A0C"
        />
        {/* Eyes */}
        <ellipse cx="17.2" cy="16.5" rx="1.35" ry="1.15" fill="#2C1810" />
        <ellipse cx="22.8" cy="16.5" rx="1.35" ry="1.15" fill="#2C1810" />
        <circle cx="17.6" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        <circle cx="23.2" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        {/* Eyebrows */}
        <path
          d="M15.5 14 Q17 13.2 18.8 14"
          stroke="#1E0E06"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M21.2 14 Q23 13.2 24.5 14"
          stroke="#1E0E06"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.8 22.5 21"
          stroke="#C07050"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blush */}
        <ellipse cx="14.5" cy="19.5" rx="2.2" ry="1.2" fill="#E07050" opacity="0.18" />
        <ellipse cx="25.5" cy="19.5" rx="2.2" ry="1.2" fill="#E07050" opacity="0.18" />
      </svg>
    </Wrap>
  );
}

/** Reza Tahir, Co-founder & CTO */
export function AvatarRT({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep teal background */}
        <rect width="40" height="40" fill="#1A5C6A" />
        {/* Dark navy blazer */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#1A2840" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#C8916A" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#C8916A" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#C8916A" />
        {/* Hair, black, short, neat */}
        <ellipse cx="20" cy="14" rx="9.5" ry="9.5" fill="#0C0604" />
        {/* Head */}
        <circle cx="20" cy="16.5" r="8" fill="#C8916A" />
        {/* Hair top */}
        <path
          d="M12 15 Q12 7.5 20 7 Q28 7.5 28 15 Q27 9 20 8 Q13 9 12 15Z"
          fill="#0C0604"
        />
        {/* Fade sides */}
        <path d="M12 13.5 Q11 17 12 21 Q12.5 17.5 12.5 15Z" fill="#0C0604" />
        <path d="M28 13.5 Q29 17 28 21 Q27.5 17.5 27.5 15Z" fill="#0C0604" />
        {/* Eyes */}
        <ellipse cx="17.2" cy="16.5" rx="1.35" ry="1.15" fill="#0C0604" />
        <ellipse cx="22.8" cy="16.5" rx="1.35" ry="1.15" fill="#0C0604" />
        <circle cx="17.6" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        <circle cx="23.2" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        {/* Eyebrows */}
        <path
          d="M15.5 14 Q17 13.2 18.8 14"
          stroke="#060302"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M21.2 14 Q23 13.2 24.5 14"
          stroke="#060302"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.5 22.5 21"
          stroke="#9A6040"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Subtle stubble hint */}
        <ellipse cx="20" cy="22" rx="4.5" ry="1.5" fill="#8A5C30" opacity="0.12" />
      </svg>
    </Wrap>
  );
}

/** Jordan Park, Co-founder & CPO */
export function AvatarJP({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sage green background */}
        <rect width="40" height="40" fill="#4A6B58" />
        {/* Warm white/cream top */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#EDE8DE" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#F2D0A0" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#F2D0A0" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#F2D0A0" />
        {/* Hair, black, stylish side part */}
        <ellipse cx="20" cy="14" rx="9.5" ry="10" fill="#120A04" />
        {/* Head */}
        <circle cx="20" cy="16" r="8" fill="#F2D0A0" />
        {/* Hair top, side-swept */}
        <path
          d="M12 14 Q12.5 6.5 20 6 Q27.5 6.5 28 14 Q26 8 20 7.5 Q14 8 12 14Z"
          fill="#120A04"
        />
        {/* Swept bang across forehead */}
        <path
          d="M13 13.5 Q15 10.5 22 10 Q24 10.5 26 12 Q22 11.5 16 12.5 Q14 13 13 13.5Z"
          fill="#120A04"
        />
        {/* Eyes */}
        <ellipse cx="17.2" cy="16.5" rx="1.35" ry="1.1" fill="#1A0A04" />
        <ellipse cx="22.8" cy="16.5" rx="1.35" ry="1.1" fill="#1A0A04" />
        <circle cx="17.6" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        <circle cx="23.2" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        {/* Eyebrows, slightly arched */}
        <path
          d="M15.5 13.8 Q17 13 18.8 13.8"
          stroke="#0A0402"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M21.2 13.8 Q23 13 24.5 13.8"
          stroke="#0A0402"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.8 22.5 21"
          stroke="#C09060"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blush subtle */}
        <ellipse cx="14.5" cy="19.5" rx="2" ry="1.1" fill="#E09060" opacity="0.16" />
        <ellipse cx="25.5" cy="19.5" rx="2" ry="1.1" fill="#E09060" opacity="0.16" />
      </svg>
    </Wrap>
  );
}

/** Ana W. */
export function AvatarAW({ size = 40, border }: AvatarProps) {
  return (
    <Wrap size={size} border={border}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rust/terracotta background */}
        <rect width="40" height="40" fill="#B54028" />
        {/* Burgundy clothing */}
        <ellipse cx="20" cy="47" rx="19" ry="15" fill="#5C1F35" />
        {/* Long dark hair, behind everything */}
        <ellipse cx="20" cy="21" rx="11.5" ry="14" fill="#1A0A06" />
        {/* Neck */}
        <rect x="17.5" y="23" width="5" height="8" rx="2.5" fill="#D49268" />
        {/* Ear hints */}
        <ellipse cx="11.8" cy="17" rx="1.5" ry="2.1" fill="#D49268" />
        <ellipse cx="28.2" cy="17" rx="1.5" ry="2.1" fill="#D49268" />
        {/* Head */}
        <circle cx="20" cy="16" r="8" fill="#D49268" />
        {/* Hair top layer */}
        <path
          d="M12.5 14 Q12 6.5 20 6 Q28 6.5 27.5 14 Q27 8 20 7 Q13 8 12.5 14Z"
          fill="#1A0A06"
        />
        {/* Long side strands */}
        <path
          d="M12.5 12 Q11 17 11 24 Q11.5 27.5 13 28 Q13 24 12.5 20 Q12 17 12.5 13Z"
          fill="#1A0A06"
        />
        <path
          d="M27.5 12 Q29 17 29 24 Q28.5 27.5 27 28 Q27 24 27.5 20 Q28 17 27.5 13Z"
          fill="#1A0A06"
        />
        {/* Eyes */}
        <ellipse cx="17.2" cy="16.5" rx="1.35" ry="1.15" fill="#1A0A06" />
        <ellipse cx="22.8" cy="16.5" rx="1.35" ry="1.15" fill="#1A0A06" />
        <circle cx="17.6" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        <circle cx="23.2" cy="15.9" r="0.42" fill="white" opacity="0.75" />
        {/* Eyebrows, strong, defined */}
        <path
          d="M15.5 14 Q17 13.1 18.8 14"
          stroke="#0A0402"
          strokeWidth="0.95"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M21.2 14 Q23 13.1 24.5 14"
          stroke="#0A0402"
          strokeWidth="0.95"
          fill="none"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path
          d="M17.5 21 Q20 22.8 22.5 21"
          stroke="#A46040"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blush */}
        <ellipse cx="14.5" cy="19.5" rx="2" ry="1.3" fill="#C07050" opacity="0.22" />
        <ellipse cx="25.5" cy="19.5" rx="2" ry="1.3" fill="#C07050" opacity="0.22" />
      </svg>
    </Wrap>
  );
}
