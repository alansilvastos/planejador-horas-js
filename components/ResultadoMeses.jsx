'use client';
import React from 'react';

export default function ResultadoMeses({ planejamento, totalAnual }) {
  const metaAnual = 600;
  const meses = Object.keys(planejamento);
  const atingido = totalAnual >= metaAnual;

  return (
    <div className="mt-10 text-left space-y-4">
      <h3 className="text-xl font-bold text-blue-500">Horas por Mês</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
        {meses.map((mes) => (
          <div key={mes} className="text-sm">
            {mes}: <strong>{planejamento[mes].toFixed(1)} h</strong>
          </div>
        ))}
      </div>
      <div className="mt-4 text-base">
        <strong>Total Anual:</strong> {totalAnual.toFixed(1)} h
      </div>
      <div className={`font-semibold ${atingido ? 'text-green-500' : 'text-red-500'}`}>
        {atingido ? '✔ Meta Atingida!' : '✘ Meta ainda não atingida'}
      </div>
    </div>
  );
}
