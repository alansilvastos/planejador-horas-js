'use client';

import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Button } from '@/components/ui/button';

const MESES = [
  'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto'
];

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const metas = {
  regular: 600,
  auxiliar: 30,
  especial: 15
};

export default function Page() {
  const [tipo, setTipo] = useState('regular');
  const [horas, setHoras] = useState(Array(7).fill(0));

  const totalSemanal = horas.reduce((a, b) => a + b, 0);
  const totalAnual = totalSemanal * 52;
  const meta = metas[tipo];
  const diferenca = totalAnual - meta;

  const exportarPDF = () => {
    const el = document.getElementById('resumo');
    html2pdf().from(el).save('planejamento.pdf');
  };

  const atualizarHora = (index, delta) => {
    const novas = [...horas];
    novas[index] = Math.max(0, novas[index] + delta);
    setHoras(novas);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Planejador de Horas do Pioneiro</h1>

      <div className="mb-4">
        <label className="mr-2">Escolha o tipo:</label>
        <select
          className="border rounded p-1"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          <option value="regular">Pioneiro Regular (600h)</option>
          <option value="auxiliar">Pioneiro Auxiliar (30h)</option>
          <option value="especial">Pioneiro Especial (15h)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-7 mb-4">
        {DIAS.map((dia, idx) => (
          <div key={dia} className="bg-white shadow p-2 rounded">
            <div className="font-semibold text-center">{dia}</div>
            <div className="flex justify-center items-center gap-1 mt-1">
              <button onClick={() => atualizarHora(idx, -0.5)}>-</button>
              <span>{horas[idx].toFixed(1)} h</span>
              <button onClick={() => atualizarHora(idx, 0.5)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={() => setHoras(Array(7).fill(0))}>Limpar</Button>
        <Button onClick={exportarPDF}>Exportar para PDF</Button>
      </div>

      <div id="resumo" className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Resumo</h2>
        <p>Total por semana: {totalSemanal.toFixed(1)} h</p>
        <p>Total por ano: {totalAnual.toFixed(1)} h</p>
        <p>Meta anual: {meta} h</p>
        <p>
          Diferença: <span className={diferenca >= 0 ? 'text-green-600' : 'text-red-600'}>
            {diferenca >= 0 ? '+' : ''}{diferenca.toFixed(1)} h
          </span>
        </p>

        <h3 className="font-semibold mt-4">Horas por Mês</h3>
        <ul className="list-disc ml-6">
          {MESES.map(mes => (
            <li key={mes}>{mes}: {(totalSemanal * 4.33).toFixed(1)} h</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
