"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";

const meses = [
  "Setembro", "Outubro", "Novembro", "Dezembro",
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto"
];

const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const semanasPorMes = [4, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4];

const tipos = {
  regular: { label: "Pioneiro Regular (600h por ano)", alvo: 600, tipo: "anual" },
  aux30: { label: "Pioneiro Auxiliar (30h por mês)", alvo: 30, tipo: "mensal" },
  aux15: { label: "Pioneiro Auxiliar (15h por mês)", alvo: 15, tipo: "mensal" },
};

export default function PlanejadorHoras() {
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));
  const [tipo, setTipo] = useState("regular");

  const handleLimpar = () => {
    setHorasPorDia(Array(7).fill(0));
  };

  const incrementar = (i) => {
    const novo = [...horasPorDia];
    novo[i] = Math.min(novo[i] + 0.5, 24);
    setHorasPorDia(novo);
  };

  const decrementar = (i) => {
    const novo = [...horasPorDia];
    novo[i] = Math.max(novo[i] - 0.5, 0);
    setHorasPorDia(novo);
  };

  const horasSemana = horasPorDia.reduce((acc, h) => acc + h, 0);
  const horasMes = semanasPorMes.map((sem) => sem * horasSemana);
  const total = horasMes.reduce((acc, h) => acc + h, 0);
  const alvo = tipos[tipo].alvo;

  let mesAlvoAnual = null;
  if (tipos[tipo].tipo === "anual") {
    let acumulado = 0;
    for (let i = 0; i < horasMes.length; i++) {
      acumulado += horasMes[i];
      if (acumulado >= alvo) {
        mesAlvoAnual = meses[i];
        break;
      }
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor("#1F2937");
    doc.text("Planejamento - Pioneiro", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor("#374151");
    doc.text(`Tipo: ${tipos[tipo].label}`, 20, 30);
    doc.text(`Total estimado: ${total.toFixed(1)} horas`, 20, 38);

    if (mesAlvoAnual) {
      doc.setTextColor("#16A34A");
      doc.text(`✔ Alvo anual atingido em: ${mesAlvoAnual}`, 20, 46);
    }

    doc.setTextColor("#111827");
    doc.setFontSize(14);
    doc.text("Horas por mês:", 20, 58);

    horasMes.forEach((h, i) => {
      const y = 66 + i * 7;
      const status = tipos[tipo].tipo === "mensal" ? (h >= alvo ? "✔" : "⚠") : "";
      const cor = tipos[tipo].tipo === "mensal" && h >= alvo ? "#15803D" : "#DC2626";
      doc.setTextColor(cor);
      doc.text(`${meses[i]}: ${h.toFixed(1)} h ${status}`, 20, y);
    });

    doc.save("planejamento_pioneiro.pdf");
  };

  return (
    <div className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Planejamento – Pioneiro</h1>

      <label className="block mb-2 font-medium">Escolha o tipo:</label>
      <select className="mb-4 p-2 border rounded w-full" value={tipo} onChange={(e) => setTipo(e.target.value)}>
        {Object.entries(tipos).map(([key, val]) => (
          <option key={key} value={key}>{val.label}</option>
        ))}
      </select>

      <div className="mb-4 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Horas por Dia da Semana</h2>
        <div className="grid grid-cols-1 gap-2">
          {diasSemana.map((dia, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-12">{dia}:</span>
              <button onClick={() => decrementar(i)} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span className="w-12 text-center">{horasPorDia[i].toFixed(1)} h</span>
              <button onClick={() => incrementar(i)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button onClick={handleLimpar} className="px-4 py-2 border rounded">Limpar</button>
        <button onClick={exportarPDF} className="px-4 py-2 bg-blue-600 text-white rounded">Exportar para PDF</button>
      </div>

      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Horas por Mês</h2>
        <ul className="grid grid-cols-2 gap-2">
          {meses.map((mes, i) => {
            const h = horasMes[i];
            const ok = tipos[tipo].tipo === "mensal" ? h >= alvo : true;
            return (
              <li key={i} className={ok ? "text-green-700" : "text-red-600"}>
                <strong>{mes}:</strong> {h.toFixed(1)} h {tipos[tipo].tipo === "mensal" && (ok ? "✔" : "⚠")}
              </li>
            );
          })}
        </ul>
        {mesAlvoAnual && (
          <p className="mt-4 text-blue-600 font-medium">✔ Alvo anual atingido em: {mesAlvoAnual}</p>
        )}
      </div>
    </div>
  );
}