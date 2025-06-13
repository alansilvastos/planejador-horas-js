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

  const ajustarHora = (i, delta) => {
    const novo = [...horasPorDia];
    novo[i] = Math.max(0, Math.round((novo[i] + delta) * 2) / 2); // intervalos de 0.5
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
    <div style={{
      background: '#f9f9f9', color: '#333',
      padding: 20, fontFamily: 'Poppins, sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#1a73e8' }}>Planejador de Horas 2025/2026</h1>
      <p>Meta anual: 600 horas (set/2025 a ago/2026)</p>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Horas por Dia da Semana</h2>
        {horasPorDia.map((valor, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            marginBottom: 12, gap: 10
          }}>
            <label style={{ width: 60 }}>{nomesDias[i]}:</label>
            <button onClick={() => ajustarHora(i, -0.5)} style={{ padding: '4px 10px' }}>-</button>
            <span style={{ width: 50, textAlign: 'center' }}>{valor.toFixed(1)} h</span>
            <button onClick={() => ajustarHora(i, 0.5)} style={{ padding: '4px 10px' }}>+</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 18, color: '#1a73e8' }}>Horas por Mês</h2>
        <ul style={{ columns: 2, listStyle: 'none', padding: 0 }}>
          {horasMes.map((hm, i) => (
            <li key={i}>{nomesMeses[i]}: {hm.toFixed(1)} h</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Total Anual:</strong> {totalAno.toFixed(1)} h
        <p style={{ color: totalAno >= meta ? 'green' : 'orange' }}>
          {totalAno >= meta ? '✔ Meta Atingida!' : '⚠ Ainda não atingiu a meta.'}
        </p>
      </div>
    </div>
  );
}