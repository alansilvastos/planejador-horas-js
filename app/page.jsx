"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Planejador de Horas do Pioneiro</h1>
      <p className="mb-2">Contador de exemplo:</p>
      <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Aumentar ({count})
      </button>
    </main>
  );
}
