'use client';
import { useEffect, useState } from 'react';

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
        setMensagem(`✅ Meta Atingida em ${mesMetaRegular}`);
      } else {
        setMensagem(`❌ Meta ainda não atingida`);
      }
    } else if (tipo === 'auxiliar15' || tipo === 'auxiliar30') {
      const restante = 600 - totalAnual;
      setMensagem(`Total Anual: ${totalAnual.toFixed(1)} h — Faltam ${restante.toFixed(1)} h para 600 h`);
    }
  }, [planejamento, totalAnual, tipo, mesMetaRegular]);

  const verificarAtingiuMetaMensal = (horas) => {
    if (tipo === 'auxiliar15') return horas >= 15;
    if (tipo === 'auxiliar30') return horas >= 30;
    return false;
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-blue-700 mb-4">Horas por Mês</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left max-w-md mx-auto">
        {Object.entries(planejamento).map(([mes, horas]) => (
          <div
            key={mes}
            className={`${
              tipo === 'regular' && mes === mesMetaRegular
                ? 'text-green-600 font-bold'
                : verificarAtingiuMetaMensal(horas)
                ? 'text-green-500 font-semibold'
                : ''
            }`}
          >
            {mes}: {horas.toFixed(1)} h
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-center">
        {tipo === 'regular' && (
          <p className={`text-base ${totalAnual >= 600 ? 'text-green-600' : 'text-red-500'}`}>
            {mensagem}
          </p>
        )}

        {(tipo === 'auxiliar15' || tipo === 'auxiliar30') && (
          <>
            <p className="text-base font-semibold text-gray-700">
              Total Anual: {totalAnual.toFixed(1)} h
            </p>
            <p className={`text-sm ${totalAnual >= 600 ? 'text-green-600' : 'text-purple-600'}`}>
              {mensagem}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
