export const metadata = {
  title: 'Planejador de Horas do Pioneiro',
  description: 'App para planejamento de horas do pioneiro com exportação em PDF.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 p-4 font-sans">
        {children}
      </body>
    </html>
  );
}
