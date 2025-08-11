"use client";
import React, { useState, useEffect } from "react";
import meses, { calcularHorasMensais } from "../calendario";

export default function FormularioHoras() {
  const [tipoSelecionado, setTipoSelecionado] = useState("regular");
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

  useEffect(() => {
    const calculo = calcularHorasMensais(horasPorDia);
    setHorasMensais(calculo);
  }, [horasPorDia]);

  const metas = {
    regular: { anual: 600, mensal: 50 },
    auxiliar30: { anual: null, mensal: 30 },
    auxiliar15: { anual: null, mensal: 15 },
  };

  const handleChange = (dia, valor) => {
    setHorasPorDia({
      ...horasPorDia,
      [dia]: parseFloat(valor) || 0,
    });
  };

  const totalAno = horasMensais.reduce((acc, h) => acc + h, 0);
  const metaAtual = metas[tipoSelecionado];
  const faltamPara600 =
    tipoSelecionado !== "regular" ? Math.max(0, 600 - totalAno) : 0;

  // Encontrar mês que atinge 600 horas para regular
  let mesAlvo = null;
  if (tipoSelecionado === "regular") {
    let acumulado = 0;
    for (let i = 0; i < horasMensais.length; i++) {
      acumulado += horasMensais[i];
      if (acumulado >= metaAtual.anual) {
        mesAlvo = meses[i];
        break;
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Planejador de Horas
      </h2>

      {/* Seleção do tipo */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            tipoSelecionado === "regular"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setTipoSelecionado("regular")}
        >
          Pioneiro Regular
        </button>
        <button
          className={`px-3 py-1 rounded ${
            tipoSelecionado === "auxiliar30"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setTipoSelecionado("auxiliar30")}
        >
          Pioneiro Auxiliar 30h
        </button>
        <button
          className={`px-3 py-1 rounded ${
            tipoSelecionado === "auxiliar15"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setTipoSelecionado("auxiliar15")}
        >
          Pioneiro Auxiliar 15h
        </button>
      </div>

      {/* Tabela de dias */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.keys(horasPorDia).map((dia) => (
          <div key={dia} className="flex justify-between items-center">
            <label className="font-medium">{dia}</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={horasPorDia[dia]}
              onChange={(e) => handleChange(dia, e.target.value)}
              className="w-20 border rounded px-2 py-1"
            />
          </div>
        ))}
      </div>

      {/* Resumo dos meses */}
      <h3 className="text-lg font-semibold mb-2">Resumo Mensal</h3>
      <ul className="space-y-1">
        {meses.map((mes, index) => {
          const horas = horasMensais[index] || 0;
          const atingiuMeta =
            tipoSelecionado === "regular"
              ? horas >= metaAtual.mensal
              : horas >= metaAtual.mensal;
          return (
            <li
              key={mes}
              className={`flex justify-between items-center p-2 rounded ${
                tipoSelecionado === "regular" && mes === mesAlvo
                  ? "bg-green-100 font-bold"
                  : ""
              }`}
            >
              <span>{mes}</span>
              <span>
                {horas.toFixed(1)}h{" "}
                {atingiuMeta ? "✅" : "❌"}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Resumo final */}
      <div className="mt-4 p-3 border-t text-center">
        <p>
          <strong>Total no ano:</strong> {totalAno.toFixed(1)} horas
        </p>
        {tipoSelecionado === "regular" && (
          <p>
            Meta anual: {metaAtual.anual} horas
            {mesAlvo && (
              <span> — Alvo atingido em {mesAlvo}</span>
            )}
          </p>
        )}
        {tipoSelecionado !== "regular" && (
          <p>
            Faltam {faltamPara600.toFixed(1)} horas para ser Pioneiro Regular
          </p>
        )}
      </div>
    </div>
  );
}
