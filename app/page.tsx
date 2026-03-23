export default function Home() {
  return (
    <iframe
      src="/resume.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
      }}
      title="Evin Carr - Resume"
      sandbox="allow-same-origin allow-scripts allow-popups"
    />
  )
}
