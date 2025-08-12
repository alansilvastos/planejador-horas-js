"use client";
import FormularioHoras from "../components/FormularioHoras";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Planejador de Horas do Pioneiro
        </h1>
        <FormularioHoras />
      </div>
    </main>
  );
}
