'use client';
import { useState } from "react";

const meses = [
  "Setembro", "Outubro", "Novembro", "Dezembro",
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto"
];

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const semanasPorMes = [4, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4];

export default function PlanejadorHoras() {
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));

  const handleChange = (index, value) => {
    const novo = [...horasPorDia];
    novo[index] = parseFloat(value) || 0;
    setHorasPorDia(novo);
  };

  const horasSemana = horasPorDia.reduce((acc, h) => acc + h, 0);
  const horasMes = semanasPorMes.map(sem => sem * horasSemana);
  const horasAno = horasMes.reduce((acc, h) => acc + h, 0);
  const metaAno = 600;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Planejador de Horas - Pioneiro Regular</h1>
      <p>Meta anual: 600 horas (de setembro a agosto)</p>

      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: "bold" }}>Horas por Dia da Semana</h2>
        {diasSemana.map((dia, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <label style={{ width: 100 }}>{dia}:</label>
            <input
              type="number"
              min="0"
              step="0.25"
              value={horasPorDia[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              style={{ width: 80, padding: 4, marginRight: 8 }}
            />
            <span>horas</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: "bold" }}>Resumo</h2>
        <p><strong>Total por semana:</strong> {horasSemana.toFixed(2)} h</p>
        <p><strong>Total estimado por ano:</strong> {horasAno.toFixed(1)} h</p>
        <p style={{ color: horasAno >= metaAno ? "green" : "red" }}>
          {horasAno >= metaAno ? "✔ Você atingirá sua meta!" : "⚠ Ainda faltam horas para atingir sua meta."}
        </p>
      </div>

      <div>
        <h2 style={{ fontSize: 18, fontWeight: "bold" }}>Horas por Mês</h2>
        <ul style={{ columns: 2 }}>
          {meses.map((mes, i) => (
            <li key={i}>{mes}: {horasMes[i].toFixed(1)} h</li>
          ))}
        </ul>
      </div>
    </div>
  );
}