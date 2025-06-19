"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function Home() {
  const [diasDaSemana, setDiasDaSemana] = useState([
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
  ]);
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));
  const [metaAnual, setMetaAnual] = useState(600);
  const [calendario, setCalendario] = useState([]);

  useEffect(() => {
    gerarCalendario();
  }, [horasPorDia, metaAnual]);

  function gerarCalendario() {
    const inicio = new Date("2025-09-01");
    const fim = new Date("2026-08-31");
    const diasDistribuidos = [];

    while (inicio <= fim) {
      const dia = new Date(inicio);
      const indice = dia.getDay() === 0 ? 6 : dia.getDay() - 1;
      const horas = horasPorDia[indice];
      if (horas > 0) {
        diasDistribuidos.push({ data: dia.toISOString().slice(0, 10), horas });
      }
      inicio.setDate(inicio.getDate() + 1);
    }

    setCalendario(diasDistribuidos);
  }

  function exportarPDF() {
    html2canvas(document.querySelector("#relatorio")).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("planejamento.pdf");
    });
  }

  return (
    <main className="p-4 max-w-3xl mx-auto font-sans text-black">
      <h1 className="text-2xl font-bold mb-4">Planejador de Horas do Pioneiro</h1>

      <label className="block mb-4">
        Meta anual de horas:
        <input
          type="number"
          value={metaAnual}
          onChange={(e) => setMetaAnual(parseInt(e.target.value))}
          className="ml-2 border p-1 w-24"
        />
      </label>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {diasDaSemana.map((dia, index) => (
          <label key={dia} className="flex items-center gap-2">
            {dia}:
            <input
              type="number"
              value={horasPorDia[index]}
              onChange={(e) => {
                const novasHoras = [...horasPorDia];
                novasHoras[index] = parseFloat(e.target.value);
                setHorasPorDia(novasHoras);
              }}
              className="border p-1 w-20"
            />
            h
          </label>
        ))}
      </div>

      <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Exportar PDF
      </button>

      <div id="relatorio" className="bg-white p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Programação Anual</h2>
        <ul className="list-disc list-inside text-sm">
          {calendario.map((dia, index) => (
            <li key={index}>{dia.data} - {dia.horas} horas</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
