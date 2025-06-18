'use client';
import { useState } from "react";
import jsPDF from "jspdf";

const diasPorMes = {"2025-09": [5, 5, 4, 4, 4, 4, 4], "2025-10": [4, 4, 5, 5, 5, 4, 4], "2025-11": [4, 4, 4, 4, 4, 5, 5], "2025-12": [5, 5, 5, 4, 4, 4, 4], "2026-01": [4, 4, 4, 5, 5, 5, 4], "2026-02": [4, 4, 4, 4, 4, 4, 4], "2026-03": [5, 5, 4, 4, 4, 4, 5], "2026-04": [4, 4, 5, 5, 4, 4, 4], "2026-05": [4, 4, 4, 4, 5, 5, 5], "2026-06": [5, 5, 4, 4, 4, 4, 4], "2026-07": [4, 4, 5, 5, 5, 4, 4], "2026-08": [5, 4, 4, 4, 4, 5, 5]};
const nomesMeses = ["Setembro", "Outubro", "Novembro", "Dezembro", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto"];
const nomesDias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function PlanejadorHoras() {
  const [tipo, setTipo] = useState("regular"); // 'regular', 'aux30', 'aux15'
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));

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

  const alvoMensal = tipo === "aux30" ? 30 : tipo === "aux15" ? 15 : null;
  const alvoAnual = tipo === "regular" ? 600 : null;

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Planejamento - Pioneiro", 10, 20);
    doc.setFontSize(12);
    horasMes.forEach((hm, i) => {
      const label = nomesMeses[i] + ": " + hm.toFixed(1) + " h";
      doc.text(label, 10, 35 + i * 8);
    });
    doc.text("Total: " + totalAno.toFixed(1) + " h", 10, 140);
    doc.save("planejamento_pioneiro.pdf");
  };

  return (
    <div style={{
      background: '#f4f6f8', color: '#333', padding: 24,
      fontFamily: 'Poppins, sans-serif', minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: 26, fontWeight: 'bold', color: '#0b5394' }}>Planejamento - Pioneiro</h1>

      <div style={{ marginTop: 20 }}>
        <label><strong>Escolha o tipo:</strong></label>
        <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ marginLeft: 10, padding: 5 }}>
          <option value="regular">Pioneiro Regular (600h no ano)</option>
          <option value="aux30">Pioneiro Auxiliar (30h por mês)</option>
          <option value="aux15">Pioneiro Auxiliar (15h por mês)</option>
        </select>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 18 }}>Horas por Dia da Semana</h2>
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
        <h2 style={{ fontSize: 18 }}>Horas por Mês</h2>
        <ul style={{ columns: 2, listStyle: 'none', padding: 0 }}>
          {horasMes.map((hm, i) => (
            <li key={i} style={{ color: (alvoMensal && hm >= alvoMensal) ? 'green' : (alvoMensal ? 'red' : 'inherit'), fontWeight: alvoMensal ? 'bold' : 'normal' }}>
              {nomesMeses[i]}: {hm.toFixed(1)} h
              {alvoMensal ? (hm >= alvoMensal ? " ✔" : " ⚠") : ""}
            </li>
          ))}
        </ul>
      </div>

      {alvoAnual && (
        <div style={{ marginTop: 20 }}>
          <strong>Total Anual:</strong> {totalAno.toFixed(1)} h
          <p style={{ color: totalAno >= alvoAnual ? 'green' : 'orange' }}>
            {totalAno >= alvoAnual ? '✔ Alvo Atingido!' : '⚠ Ainda não atingiu o alvo.'}
          </p>
        </div>
      )}

      <button onClick={exportarPDF} style={{
        marginTop: 30, padding: '10px 20px', backgroundColor: '#0b5394',
        color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'
      }}>
        Exportar para PDF
      </button>
    </div>
  );
}