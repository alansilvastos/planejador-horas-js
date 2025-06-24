'use client';

import { useState, useEffect } from 'react';
import meses, { calcularHorasMensais } from '../data/calendario';

export default function FormularioHoras({ tipo }) {
  const [horasPorDia, setHorasPorDia] = useState({
    Segunda: 0,
    Terça: 0,
    Quarta: 0,
    Quinta: 0,
    Sexta: 0,
    Sábado: 0,
    Domingo: 0,
  });

  const [horasMensais, setHorasMensais] = useState([]);
  const [totalHoras, setTotalHoras] = useState(0);
  const [metaAtingida, setMetaAtingida] = useState(false);
  const [mesMetaRegular, setMesMetaRegular] = useState(null);

  const metas = {
    regular: 600,
    auxiliar30: 30,
    auxiliar15: 15,
  };

  useEffect(() => {
    const resultado = calcularHorasMensais(horasPorDia);
    setHorasMensais(resultado);

    const total = resultado.reduce((acc, h) => acc + h, 0);
    setTotalHoras(total);

    if (tipo === 'regular') {
      setMetaAtingida(total >= metas.regular);

      let acumulado = 0;
      const mesAlvo = resultado.findIndex((h) => {
        acumulado += h;
        return acumulado >= metas.regular;
      });
      setMesMetaRegular(mesAlvo);
    } else {
      setMetaAtingida(resultado.every((h) => h >= metas[tipo]));
      setMesMetaRegular(null);
    }
  }, [horasPorDia, tipo]);

  const atualizarHoras = (dia, valor) => {
    setHorasPorDia((prev) => ({
      ...prev,
      [dia]: Math.max(0, (prev[dia] || 0) + valor),
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">Horas por Dia da Semana</h2>

      {Object.keys(horasPorDia).map((dia) => (
        <div key={dia} className="flex justify-between items-center mb-2">
          <span className="w-20 text-left">{dia.slice(0, 3)}:</span>
          <div className="flex gap-2 items-center">
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => atualizarHoras(dia, -0.5)}
            >
              -
            </button>
            <span className="w-14">{horasPorDia[dia].toFixed(1)} h</span>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => atualizarHoras(dia, 0.5)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-700">Horas por Mês</h2>
      <div className="grid grid-cols-3 text-sm gap-2 justify-items-start text-left">
        {horasMensais.map((horas, i) => {
          const metaMes = tipo !== 'regular' && horas >= metas[tipo];
          const metaAno = tipo === 'regular' && mesMetaRegular === i;

          return (
            <div
              key={i}
              className={`${
                metaMes || metaAno ? 'text-green-700 font-bold' : ''
              }`}
            >
              {meses[i]}: {horas.toFixed(1)} h
            </div>
          );
        })}
      </div>

      <p className="mt-4 font-semibold">
        Total Anual: {totalHoras.toFixed(1)} h
      </p>

      {tipo === 'regular' ? (
        <p className={metaAtingida ? 'text-green-600' : 'text-red-600'}>
          {metaAtingida
            ? '✔ Meta Atingida!'
            : `✘ Meta ainda não atingida`}
        </p>
      ) : (
        <>
          <p className={metaAtingida ? 'text-green-600' : 'text-red-600'}>
            {metaAtingida
              ? '✔ Todas as metas mensais foram atingidas!'
              : '✘ Algumas metas mensais não foram atingidas'}
          </p>
          <p className="mt-2 text-sm">
            Se fosse Pioneiro Regular: {totalHoras.toFixed(1)} h — Faltam{' '}
            {(600 - totalHoras).toFixed(1)} h para 600 h
          </p>
        </>
      )}
    </div>
  );
}
