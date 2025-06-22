import '../styles/globals.css';

export const metadata = {
  title: 'Planejador de Horas',
  description: 'Acompanhe suas metas como pioneiro',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}