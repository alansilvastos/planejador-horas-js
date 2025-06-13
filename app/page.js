'use client';
import { useState } from "react";
import jsPDF from "jspdf";

const diasPorMes = {"2025-09": [5, 5, 4, 4, 4, 4, 4], "2025-10": [4, 4, 5, 5, 5, 4, 4], "2025-11": [4, 4, 4, 4, 4, 5, 5], "2025-12": [5, 5, 5, 4, 4, 4, 4], "2026-01": [4, 4, 4, 5, 5, 5, 4], "2026-02": [4, 4, 4, 4, 4, 4, 4], "2026-03": [5, 5, 4, 4, 4, 4, 5], "2026-04": [4, 4, 5, 5, 4, 4, 4], "2026-05": [4, 4, 4, 4, 5, 5, 5], "2026-06": [5, 5, 4, 4, 4, 4, 4], "2026-07": [4, 4, 5, 5, 5, 4, 4], "2026-08": [5, 4, 4, 4, 4, 5, 5]};
const nomesMeses = ["Setembro", "Outubro", "Novembro", "Dezembro", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto"];
const nomesDias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const perfis = {
  trabalho: [2, 2, 2, 0, 2, 3, 2],
  idoso:    [2, 2, 2, 2, 2, 2, 0],
  fimsemana: [1, 1, 1, 1, 1, 5, 2],
  auxiliar: [1, 1, 1, 1, 1, 2, 2],
};

export default function PlanejadorHoras() {
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));

  const aplicarPerfil = (tipo) => {
    setHorasPorDia(perfis[tipo] || Array(7).fill(0));
  };

  const ajustarHora = (i, delta) => {
    const novo = [...horasPorDia];
    novo[i] = Math.max(0, Math.round((novo[i] + delta) * 2) / 2);
    setHorasPorDia(novo);
  };

  const mesesChave = Object.keys(diasPorMes).sort();
  const horasMes = mesesChave.map(key => {
    const dias = diasPorMes[key];
    return dias.reduce((acc, qtd, i) => acc + (qtd * horasPorDia[i]), 0);
  });
  const totalAno = horasMes.reduce((a, b) => a + b, 0);
  const alvo = 600;
  const mesAlvo = (() => {
    let acum = 0;
    for (let i = 0; i < horasMes.length; i++) {
      acum += horasMes[i];
      if (acum >= alvo) return i;
    }
    return -1;
  })();

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Planejamento - Pioneiro Regular 2025/2026", 10, 20);
    doc.setFontSize(12);
    horasMes.forEach((hm, i) => {
      const label = nomesMeses[i] + ": " + hm.toFixed(1) + " h";
      doc.text(label, 10, 35 + i * 8);
    });
    doc.text("Total: " + totalAno.toFixed(1) + " h", 10, 140);
    doc.save("planejamento_pioneiro_2025_2026.pdf");
  };

  return (
    <div style={{
      background: '#f9f9f9', color: '#333', padding: 20,
      fontFamily: 'Poppins, sans-serif', minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#1a73e8' }}>Planejamento - Pioneiro Regular 2025/2026</h1>
      <p>Alvo anual: 600 horas (set/2025 a ago/2026)</p>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Selecionar Perfil:</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button onClick={() => aplicarPerfil("trabalho")}>🧑‍💼 Trabalho</button>
          <button onClick={() => aplicarPerfil("idoso")}>👴 Idoso</button>
          <button onClick={() => aplicarPerfil("fimsemana")}>⏳ Fim de Semana</button>
          <button onClick={() => aplicarPerfil("auxiliar")}>🕊️ Auxiliar (30h)</button>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Horas por Dia da Semana</h2>
        {horasPorDia.map((valor, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 10 }}>
            <label style={{ width: 60 }}>{nomesDias[i]}:</label>
            <button onClick={() => ajustarHora(i, -0.5)}>-</button>
            <span style={{ width: 50, textAlign: 'center' }}>{valor.toFixed(1)} h</span>
            <button onClick={() => ajustarHora(i, 0.5)}>+</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 18, color: '#1a73e8' }}>Horas por Mês</h2>
        <ul style={{ columns: 2, listStyle: 'none', padding: 0 }}>
          {horasMes.map((hm, i) => (
            <li key={i} style={{ fontWeight: mesAlvo === i ? 'bold' : 'normal' }}>
              {nomesMeses[i]}: {hm.toFixed(1)} h{mesAlvo === i ? " 🎯" : ""}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Total Anual:</strong> {totalAno.toFixed(1)} h
        <p style={{ color: totalAno >= alvo ? 'green' : 'orange' }}>
          {totalAno >= alvo ? '✔ Alvo Atingido!' : '⚠ Ainda não atingiu o alvo.'}
        </p>
      </div>

      <button onClick={exportarPDF} style={{
        marginTop: 20, padding: '8px 16px', backgroundColor: '#1a73e8',
        color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'
      }}>
        Exportar para PDF
      </button>
    </div>
  );
}