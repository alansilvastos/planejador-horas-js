'use client';
import { useState, useEffect } from 'react';
import meses, { calcularHorasMensais } from '../data/calendario';
import ResultadoMeses from './ResultadoMeses';

export default function FormularioHoras() {
  const [tipo, setTipo] = useState('regular');
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
  const [totalSemanal, setTotalSemanal] = useState(0);

  useEffect(() => {
    const salvo = localStorage.getItem('planejamentoHoras');
    if (salvo) {
      const dados = JSON.parse(salvo);
      setTipo(dados.tipo || 'regular');
      setHorasPorDia(dados.horasPorDia || horasPorDia);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'planejamentoHoras',
      JSON.stringify({ tipo, horasPorDia })
    );
    calcular();
  }, [tipo, horasPorDia]);

  const handleHorasChange = (dia, valor) => {
    setHorasPorDia({ ...horasPorDia, [dia]: parseFloat(valor) || 0 });
  };

  const calcular = () => {
    const totaisMensais = calcularHorasMensais(horasPorDia);
    const plano = {};
    meses.forEach((mes, i) => {
      plano[mes] = totaisMensais[i];
    });
    setPlanejamento(plano);

    const anual = totaisMensais.reduce((acc, val) => acc + val, 0);
    setTotalAnual(anual);

    const semanal = Object.values(horasPorDia).reduce((acc, val) => acc + val, 0);
    setTotalSemanal(semanal);
  };

  const limpar = () => {
    setHorasPorDia({
      Segunda: 0,
      Terça: 0,
      Quarta: 0,
      Quinta: 0,
      Sexta: 0,
      Sábado: 0,
      Domingo: 0,
    });
    setPlanejamento({});
    setTotalAnual(0);
    setTotalSemanal(0);
    localStorage.removeItem('planejamentoHoras');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Planejador de Horas do Pioneiro
      </h2>

      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setTipo('regular')}
          className={`px-4 py-2 rounded-full ${
            tipo === 'regular' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Pioneiro Regular
        </button>
        <button
          onClick={() => setTipo('auxiliar30')}
          className={`px-4 py-2 rounded-full ${
            tipo === 'auxiliar30' ? 'bg-green-600 text-white' : 'bg-gray-200'
          }`}
        >
          Auxiliar 30h
        </button>
        <button
          onClick={() => setTipo('auxiliar15')}
          className={`px-4 py-2 rounded-full ${
            tipo === 'auxiliar15' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
        >
          Auxiliar 15h
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {Object.keys(horasPorDia).map((dia) => (
          <div key={dia} className="flex flex-col items-center">
            <label className="font-medium">{dia}</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={horasPorDia[dia]}
              onChange={(e) => handleHorasChange(dia, e.target.value)}
              className="border rounded-lg p-2 w-20 text-center"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={limpar}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Limpar
        </button>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700">
          Total semanal: <span className="text-blue-600">{totalSemanal.toFixed(1)} h</span>
        </p>
      </div>

      <ResultadoMeses
        planejamento={planejamento}
        totalAnual={totalAnual}
        tipo={tipo}
      />
    </div>
  );
}
