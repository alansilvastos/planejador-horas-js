export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Planejador de Horas</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}