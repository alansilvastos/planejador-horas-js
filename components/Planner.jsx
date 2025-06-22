"use client";
import { useState, useEffect } from "react";

const metas = {
  "Pioneiro Regular (600h/ano)": 600,
  "Pioneiro Auxiliar (30h/mês)": 30 * 12,
  "Pioneiro Auxiliar (15h/mês)": 15 * 12
};

const meses = [
  "Set/25", "Out/25", "Nov/25", "Dez/25",
  "Jan/26", "Fev/26", "Mar/26", "Abr/26",
  "Mai/26", "Jun/26", "Jul/26", "Ago/26"
];

export default function Planner() {
  const [metaSelecionada, setMetaSelecionada] = useState(Object.keys(metas)[0]);
  const [horasPorSemana, setHorasPorSemana] = useState({
    seg: 0, ter: 0, qua: 0, qui: 0, sex: 0, sab: 0, dom: 0
  });
  const [dados, setDados] = useState([]);
  const [atingido, setAtingido] = useState("");

  useEffect(() => {
    const totalMeta = metas[metaSelecionada];
    const diasPorMes = [30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31];
    const diasPorSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
    const semanasPorMes = diasPorMes.map(dias => dias / 7);
    let acumulado = 0;
    const novosDados = semanasPorMes.map((semanas, i) => {
      const totalMes = semanas * diasPorSemana.reduce((soma, dia) => soma + (horasPorSemana[dia] || 0), 0);
      acumulado += totalMes;
      if (!atingido && acumulado >= totalMeta) setAtingido(meses[i]);
      return { mes: meses[i], horas: totalMes.toFixed(1), acumulado: acumulado.toFixed(1) };
    });
    setDados(novosDados);
  }, [metaSelecionada, horasPorSemana]);

  function alterarHoras(dia, valor) {
    setHorasPorSemana(prev => ({ ...prev, [dia]: parseFloat(valor) || 0 }));
  }

  return (
    <div style={{ padding: "1rem" }}>
      <label>Meta: </label>
      <select value={metaSelecionada} onChange={e => setMetaSelecionada(e.target.value)}>
        {Object.keys(metas).map(m => <option key={m}>{m}</option>)}
      </select>

      <div style={{ marginTop: "1rem" }}>
        {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map(dia => (
          <div key={dia}>
            <label>{dia.toUpperCase()}: </label>
            <input
              type="number"
              value={horasPorSemana[dia]}
              onChange={e => alterarHoras(dia, e.target.value)}
              style={{ width: "60px", marginRight: "1rem" }}
            />
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1rem" }}>Projeção mensal</h3>
      <table border="1" cellPadding="6" style={{ marginTop: "0.5rem" }}>
        <thead>
          <tr><th>Mês</th><th>Horas</th><th>Acumulado</th></tr>
        </thead>
        <tbody>
          {dados.map(d => (
            <tr key={d.mes} style={{ background: d.mes === atingido ? "#bdf" : "white" }}>
              <td>{d.mes}</td><td>{d.horas}</td><td>{d.acumulado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {atingido && <p>Meta atingida em: <strong>{atingido}</strong></p>}
    </div>
  );
}