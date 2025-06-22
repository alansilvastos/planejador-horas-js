import "@/styles/globals.css";

export const metadata = {
  title: "Planejador de Horas do Pioneiro",
  description: "Organize suas horas com facilidade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="bg-white text-black p-4">{children}</body>
    </html>
  );
}
