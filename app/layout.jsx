export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
