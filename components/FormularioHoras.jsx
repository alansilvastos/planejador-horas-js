'use client';
import { useState, useEffect } from 'react';
import meses, { calcularHorasMensais } from '../data/calendario';
import ResultadoMeses from './ResultadoMeses';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export default function FormularioHoras() {
  const [horasPorDia, setHorasPorDia] = useState({
    Segunda: 0,
    Terça: 0,
    Quarta: 0,
    Quinta: 0,
    Sexta: 0,
    Sábado: 0,
    Domingo: 0,
  });

  const [planejamento, setPlanejamento] = useState({});
  const [totalAnual, setTotalAnual] = useState(0);
  const [tipoSelecionado, setTipoSelecionado] = useState('Pioneiro Regular');

  useEffect(() => {
    const totais = calcularHorasMensais(horasPorDia);
    const novoPlanejamento = {};
    let total = 0;

    meses.forEach((nomeMes, index) => {
      const totalMes = totais[index];
      novoPlanejamento[nomeMes] = totalMes;
      total += totalMes;
    });

    setPlanejamento(novoPlanejamento);
    setTotalAnual(total);
  }, [horasPorDia]);

  const alterarHoras = (dia, valor) => {
    setHorasPorDia((prev) => ({
      ...prev,
      [dia]: Math.max(0, prev[dia] + valor)
    }));
  };

  const botoes = ['Pioneiro Regular', 'Auxiliar 30h', 'Auxiliar 15h'];

  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-2xl font-bold">Planejador de Horas do Pioneiro</h1>

      <div className="flex justify-center gap-3">
        {botoes.map((tipo) => (
          <button
            key={tipo}
            className={`px-4 py-1 rounded ${
              tipoSelecionado === tipo ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTipoSelecionado(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold">Horas por Dia da Semana</h2>

      <div className="grid grid-cols-1 gap-3">
        {diasSemana.map((dia) => (
          <div key={dia} className="flex justify-between items-center gap-4">
            <span className="w-20 text-left">{dia.slice(0, 3)}:</span>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => alterarHoras(dia, -0.5)}
            >
              -
            </button>
            <span>{horasPorDia[dia].toFixed(1)} h</span>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => alterarHoras(dia, 0.5)}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <ResultadoMeses
        planejamento={planejamento}
        totalAnual={totalAnual}
        tipo={tipoSelecionado}
      />
    </div>
  );
}
