import Image from "next/image";

interface AvatarProps {
  size?: number;
  border?: boolean;
}

function Avatar({
  src,
  alt,
  size = 40,
  border,
}: AvatarProps & { src: string; alt: string }) {
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
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
}

/** Sarah K., Head of Marketing, Lumen AI */
export function AvatarSK(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/women/44.jpg"
      alt="Sarah K."
    />
  );
}

/** Marcus D., Founder, Archform */
export function AvatarMD(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Marcus D."
    />
  );
}

/** James L. */
export function AvatarJL(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/men/55.jpg"
      alt="James L."
    />
  );
}

/** Mara Holt, Co-founder & CEO */
export function AvatarMH(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/women/22.jpg"
      alt="Mara Holt"
    />
  );
}

/** Reza Tahir, Co-founder & CTO */
export function AvatarRT(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/men/43.jpg"
      alt="Reza Tahir"
    />
  );
}

/** Jordan Park, Co-founder & CPO */
export function AvatarJP(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/men/78.jpg"
      alt="Jordan Park"
    />
  );
}

/** Ana W. */
export function AvatarAW(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      src="https://randomuser.me/api/portraits/women/65.jpg"
      alt="Ana W."
    />
  );
}
