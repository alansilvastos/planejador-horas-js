"use client";
import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function FormularioHoras() {
  const [horasSemana, setHorasSemana] = useState(
    JSON.parse(localStorage.getItem("horasSemana")) || {
      Seg: 0,
      Ter: 0,
      Qua: 0,
      Qui: 0,
      Sex: 0,
      Sáb: 0,
      Dom: 0,
    }
  );
  const [meta, setMeta] = useState(
    localStorage.getItem("meta") || "Pioneiro Regular"
  );
  const [totalSemanal, setTotalSemanal] = useState(0);
  const [resumoMeses, setResumoMeses] = useState([]);
  const metas = {
    "Pioneiro Regular": 600,
    "Auxiliar 30h": 30,
    "Auxiliar 15h": 15,
  };

  const meses = [
    "Setembro 2025", "Outubro 2025", "Novembro 2025", "Dezembro 2025",
    "Janeiro 2026", "Fevereiro 2026", "Março 2026", "Abril 2026",
    "Maio 2026", "Junho 2026", "Julho 2026", "Agosto 2026",
  ];

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("horasSemana", JSON.stringify(horasSemana));
    localStorage.setItem("meta", meta);
  }, [horasSemana, meta]);

  // Calcular totais
  useEffect(() => {
    const total = Object.values(horasSemana).reduce((acc, h) => acc + parseFloat(h || 0), 0);
    setTotalSemanal(total);

    const semanasPorMes = [4.1, 4.3, 4.2, 4.3, 4.3, 4, 4.3, 4.3, 4.3, 4.1, 4.3, 4.3];
    const resumo = meses.map((mes, i) => {
      const totalMes = total * semanasPorMes[i];
      const metaMes = meta === "Pioneiro Regular" ? 50 : metas[meta];
      return { mes, totalMes, atingiu: totalMes >= metaMes };
    });
    setResumoMeses(resumo);
  }, [horasSemana, meta]);

  const alterarHoras = (dia, valor) => {
    setHorasSemana((prev) => ({ ...prev, [dia]: valor }));
  };

  const limpar = () => {
    setHorasSemana({ Seg: 0, Ter: 0, Qua: 0, Qui: 0, Sex: 0, Sáb: 0, Dom: 0 });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      {/* Botões de meta */}
      <div className="flex justify-center mb-4 gap-2">
        {Object.keys(metas).map((tipo) => (
          <button
            key={tipo}
            onClick={() => setMeta(tipo)}
            className={`px-4 py-2 rounded-lg font-medium ${
              meta === tipo ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Inputs por dia */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.keys(horasSemana).map((dia) => (
          <div key={dia} className="flex flex-col items-center">
            <label className="font-semibold">{dia}</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={horasSemana[dia]}
              onChange={(e) => alterarHoras(dia, parseFloat(e.target.value))}
              className="w-20 text-center border rounded-lg p-1"
            />
          </div>
        ))}
      </div>

      {/* Botão limpar */}
      <div className="flex justify-center mb-4">
        <button
          onClick={limpar}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md"
        >
          Limpar
        </button>
      </div>

      {/* Total semanal */}
      <p className="text-center font-semibold">
        Total semanal: <span className="text-blue-600">{totalSemanal} h</span>
      </p>

      {/* Resumo */}
      <h2 className="text-xl font-bold text-center text-blue-700 mt-6">Resumo do Planejamento</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {resumoMeses.map(({ mes, totalMes, atingiu }) => (
          <div key={mes} className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center">
            <span className="font-semibold">{mes}</span>
            <span>{totalMes.toFixed(1)} h</span>
            {atingiu ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-red-500 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
