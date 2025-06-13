'use client';
import { useState } from "react";

const diasPorMes = {"2025-09": [5, 5, 4, 4, 4, 4, 4], "2025-10": [4, 4, 5, 5, 5, 4, 4], "2025-11": [4, 4, 4, 4, 4, 5, 5], "2025-12": [5, 5, 5, 4, 4, 4, 4], "2026-01": [4, 4, 4, 5, 5, 5, 4], "2026-02": [4, 4, 4, 4, 4, 4, 4], "2026-03": [5, 5, 4, 4, 4, 4, 5], "2026-04": [4, 4, 5, 5, 4, 4, 4], "2026-05": [4, 4, 4, 4, 5, 5, 5], "2026-06": [5, 5, 4, 4, 4, 4, 4], "2026-07": [4, 4, 5, 5, 5, 4, 4], "2026-08": [5, 4, 4, 4, 4, 5, 5]};

const nomesMeses = [
  "Setembro", "Outubro", "Novembro", "Dezembro",
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto"
];

const nomesDias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function PlanejadorHoras() {
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));

  const handleChange = (index, value) => {
    const novo = [...horasPorDia];
    novo[index] = parseFloat(value) || 0;
    setHorasPorDia(novo);
  };

  const mesesChave = Object.keys(diasPorMes).sort();
  const horasMes = mesesChave.map(key => {
    const dias = diasPorMes[key];
    return dias.reduce((acc, qtd, i) => acc + (qtd * horasPorDia[i]), 0);
  });
  const totalAno = horasMes.reduce((a, b) => a + b, 0);
  const meta = 600;

  return (
    <div style={{ background: '#000', color: '#fff', padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#00f' }}>Planejador de Horas 2025/2026</h1>
      <p>Meta anual: 600 horas (set/2025 a ago/2026)</p>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18 }}>Horas por Dia da Semana</h2>
        {horasPorDia.map((valor, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ width: 80 }}>{nomesDias[i]}:</label>
            <input
              type="number" min="0" step="0.25"
              value={valor} onChange={e => handleChange(i, e.target.value)}
              style={{ width: 80, marginRight: 10 }}
            />
            <span>h/dia</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 18, color: '#00f' }}>Horas por Mês</h2>
        <ul style={{ columns: 2, listStyle: 'none', padding: 0 }}>
          {horasMes.map((hm, i) => (
            <li key={i}>{nomesMeses[i]}: {hm.toFixed(1)} h</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Total Anual:</strong> {totalAno.toFixed(1)} h
        <p style={{ color: totalAno >= meta ? 'lime' : 'orange' }}>
          {totalAno >= meta ? '✔ Meta Atingida!' : '⚠ Ainda não atingiu a meta.'}
        </p>
      </div>
    </div>
  );
}