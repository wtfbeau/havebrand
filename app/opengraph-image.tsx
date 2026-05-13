import { ImageResponse } from 'next/og'

export const alt = 'HaveBrand — Brand Clarity for Growing Teams'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FAFAF7',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background texture dots */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, #E5DDD0 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />

        {/* Glow behind logo */}
        <div
          style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(196,75,95,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }}
        />

        {/* Logo mark */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: 28, position: 'relative' }}
        >
          <path
            d="M40 4 L76 40 L40 76 L4 40 Z"
            fill="#C44B5F"
            stroke="#C44B5F"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M28 42 L36.5 52 L52 30"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#1C1814',
            letterSpacing: '-1.5px',
            lineHeight: 1,
            marginBottom: 20,
            position: 'relative',
          }}
        >
          HaveBrand
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#6B6358',
            letterSpacing: '-0.2px',
            marginBottom: 36,
            position: 'relative',
          }}
        >
          Brand Clarity and AI Governance for Growing Teams
        </div>

        {/* Early Access pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(196,75,95,0.08)',
            border: '1px solid rgba(196,75,95,0.25)',
            borderRadius: 100,
            padding: '8px 18px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#C44B5F',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#C44B5F',
              letterSpacing: '0.02em',
            }}
          >
            Early Access
          </span>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 16,
            color: '#A89F93',
            letterSpacing: '0.02em',
          }}
        >
          havebrand.com
        </div>
      </div>
    ),
    { ...size }
  )
}
