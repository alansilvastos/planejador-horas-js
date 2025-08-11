'use client';
import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function ResultadoMeses({ planejamento, totalAnual, tipo }) {
  const [mensagem, setMensagem] = useState('');
  const [mesMetaRegular, setMesMetaRegular] = useState('');

  const metasAuxiliar = {
    auxiliar15: 15,
    auxiliar30: 30,
  };

  useEffect(() => {
    if (tipo === 'regular') {
      if (totalAnual >= 600) {
        let acumulado = 0;
        for (const [mes, total] of Object.entries(planejamento)) {
          acumulado += total;
          if (acumulado >= 600) {
            setMesMetaRegular(mes);
            break;
          }
        }
        setMensagem(`Meta Atingida em ${mesMetaRegular}`);
      } else {
        setMensagem(`Meta ainda não atingida`);
      }
    } else if (tipo === 'auxiliar15' || tipo === 'auxiliar30') {
      const restante = 600 - totalAnual;
      setMensagem(
        `Faltam ${restante > 0 ? restante.toFixed(1) : 0} h para atingir 600 h no ano`
      );
    }
  }, [planejamento, totalAnual, tipo, mesMetaRegular]);

  const verificarAtingiuMetaMensal = (horas) => {
    if (tipo === 'auxiliar15') return horas >= 15;
    if (tipo === 'auxiliar30') return horas >= 30;
    return false;
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
        Resumo do Planejamento
      </h3>

      {/* Grid de meses */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Object.entries(planejamento).map(([mes, horas]) => {
          const metaMensalAtingida = verificarAtingiuMetaMensal(horas);
          const metaAnualAtingida =
            tipo === 'regular' && mes === mesMetaRegular && totalAnual >= 600;

          return (
            <div
              key={mes}
              className={`p-4 rounded-xl shadow-md flex flex-col items-center ${
                metaAnualAtingida || metaMensalAtingida
                  ? 'bg-green-100 border border-green-400'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="font-semibold">{mes}</span>
              <span className="text-lg">{horas.toFixed(1)} h</span>
              {metaAnualAtingida || metaMensalAtingida ? (
                <CheckCircleIcon className="w-6 h-6 text-green-600 mt-1" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-500 mt-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Totais e mensagens */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-lg font-semibold text-gray-800">
          Total Anual: {totalAnual.toFixed(1)} h
        </p>

        <p
          className={`text-base ${
            (tipo === 'regular' && totalAnual >= 600) ||
            (tipo !== 'regular' && totalAnual >= 600)
              ? 'text-green-600'
              : 'text-red-500'
          }`}
        >
          {mensagem}
        </p>
      </div>
    </div>
  );
}
