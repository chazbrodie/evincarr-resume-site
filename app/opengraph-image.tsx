import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Evin Carr - Remote Operations Specialist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#FAFAF9',
          borderTop: '6px solid #155E75',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 0 60px 80px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#18181B',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Evin Carr
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#52525B',
              lineHeight: 1.4,
              marginBottom: 32,
            }}
          >
            Remote Operations Specialist
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#155E75',
              fontWeight: 600,
            }}
          >
            AI-Powered Workflow Automation
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 32,
              fontSize: 16,
              color: '#71717A',
            }}
          >
            <span>evincarr.com</span>
            <span style={{ color: '#D4D4D8' }}>·</span>
            <span>Claude AI</span>
            <span style={{ color: '#D4D4D8' }}>·</span>
            <span>Google Apps Script</span>
            <span style={{ color: '#D4D4D8' }}>·</span>
            <span>Zapier</span>
          </div>
        </div>
        {/* Right side - headshot */}
        <div
          style={{
            width: 340,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 60,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://evincarr.com/headshot.jpg"
            alt="Evin Carr"
            width={220}
            height={268}
            style={{
              borderRadius: 8,
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
