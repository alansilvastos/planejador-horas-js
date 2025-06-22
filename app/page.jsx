'use client';
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Planejador de Horas do Pioneiro</h1>
      <p>Contador de exemplo:</p>
      <button onClick={() => setCount(count + 1)}>
        Aumentar ({count})
      </button>
    </div>
  );
}