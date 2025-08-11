'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function FormularioHoras(props) {
  // aceita tanto props.tipo quanto props.tipoSelecionado (compatibilidade)
  const tipo = props.tipo ?? props.tipoSelecionado ?? 'regular';

  const [horasSemana, setHorasSemana] = useState({
    seg: 0, ter: 0, qua: 0, qui: 0, sex: 0, sab: 0, dom: 0
  });
  const [resultado, setResultado] = useState([]);
  const [totalSemanal, setTotalSemanal] = useState(0);

  const metas = {
    regular: { anual: 600, mensal: 50 },
    auxiliar30: { anual: null, mensal: 30 },
    auxiliar15: { anual: null, mensal: 15 }
  };

  const meses = [
    'Setembro 2025', 'Outubro 2025', 'Novembro 2025', 'Dezembro 2025',
    'Janeiro 2026', 'Fevereiro 2026', 'Março 2026', 'Abril 2026',
    'Maio 2026', 'Junho 2026', 'Julho 2026', 'Agosto 2026'
  ];

  // calcula resultados sempre que horasSemana ou tipo mudarem
  useEffect(() => {
    calcularResultado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horasSemana, tipo]);

  const handleChange = (dia, valor) => {
    // parseFloat e fallback para 0
    const v = parseFloat(valor);
    setHorasSemana(prev => ({ ...prev, [dia]: isNaN(v) ? 0 : v }));
  };

  const calcularResultado = () => {
    // total semanal
    const totalSem = Object.values(horasSemana).reduce((a, b) => a + (Number(b) || 0), 0);
    setTotalSemanal(totalSem);

    // se quiser precisão por calendário real, troque essa regra pela função calcularHorasMensais
    // aqui usamos média de 4.345 semanas por mês (meses médios)
    const fator = 4.345;
    const horasMensais = meses.map(() => totalSem * fator);

    setResultado(horasMensais);
  };

  const limpar = () => {
    setHorasSemana({ seg: 0, ter: 0, qua: 0, qui: 0, sex: 0, sab: 0, dom: 0 });
    setResultado([]);
    setTotalSemanal(0);
  };

  // pegar meta mensal com segurança
  const metaObj = metas[tipo] ?? { anual: null, mensal: null };
  const metaMensal = metaObj.mensal;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-bold text-center mb-4">Horas por Dia da Semana</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.keys(horasSemana).map((diaKey) => (
          <div key={diaKey} className="flex flex-col items-center">
            <label className="capitalize mb-1">{diaKey}</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={horasSemana[diaKey]}
              onChange={(e) => handleChange(diaKey, e.target.value)}
              className="border rounded p-2 w-20 text-center"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={limpar}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Limpar
        </button>
      </div>

      <p className="text-center text-lg font-semibold mb-6">
        Total semanal: <span className="text-blue-600">{totalSemanal.toFixed(1)} h</span>
      </p>

      <h3 className="text-center text-xl font-bold mt-6 mb-4 text-blue-700">
        Resumo do Planejamento
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resultado.map((horas, idx) => {
          const atingiuMeta = (metaMensal != null) ? horas >= metaMensal : false;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center p-4 border rounded-lg shadow-md ${
                atingiuMeta ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="font-semibold text-center">{meses[idx]}</span>
              <span className="text-lg">{horas.toFixed(1)} h</span>
              {atingiuMeta ? (
                <CheckCircleIcon className="w-6 h-6 text-green-500 mt-2" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-500 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
