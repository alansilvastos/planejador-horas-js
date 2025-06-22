"use client";

import { useState } from "react";

export default function Planner() {
  const [dias, setDias] = useState({
    segunda: 0,
    terca: 0,
    quarta: 0,
    quinta: 0,
    sexta: 0,
    sabado: 0,
    domingo: 0,
  });

  const calcularTotal = () =>
    Object.values(dias).reduce((total, horas) => total + Number(horas), 0);

  const calcularMeta = () => (calcularTotal() * 52).toFixed(1);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Horas por dia da semana</h2>
      {Object.keys(dias).map((dia) => (
        <div key={dia} className="mb-2 flex justify-between items-center">
          <label className="capitalize">{dia}</label>
          <input
            type="number"
            value={dias[dia]}
            onChange={(e) =>
              setDias({ ...dias, [dia]: e.target.value || 0 })
            }
            className="border p-1 w-20 text-right rounded"
          />
        </div>
      ))}
      <div className="mt-4">
        <p>Total semanal: <strong>{calcularTotal()} h</strong></p>
        <p>Meta anual: <strong>{calcularMeta()} h</strong></p>
      </div>
    </main>
  );
}