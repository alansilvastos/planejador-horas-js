"use client";
import { useState, useEffect } from "react";

export default function FormularioHoras() {
  const meses = [
    "Setembro 2025", "Outubro 2025", "Novembro 2025", "Dezembro 2025",
    "Janeiro 2026", "Fevereiro 2026", "Março 2026", "Abril 2026",
    "Maio 2026", "Junho 2026", "Julho 2026", "Agosto 2026"
  ];

  const calendario = [
    { Segunda: 5, Terça: 4, Quarta: 4, Quinta: 4, Sexta: 4, Sábado: 4, Domingo: 4 },
    { Segunda: 4, Terça: 5, Quarta: 5, Quinta: 5, Sexta: 5, Sábado: 4, Domingo: 4 },
    { Segunda: 4, Terça: 4, Quarta: 4, Quinta: 4, Sexta: 4, Sábado: 5, Domingo: 5 },
    { Segunda: 5, Terça: 5, Quarta: 5, Quinta: 4, Sexta: 4, Sábado: 4, Domingo: 4 },
    { Segunda: 4, Terça: 4, Quarta: 5, Quinta: 5, Sexta: 5, Sábado: 4, Domingo: 4 },
    { Segunda: 4, Terça: 4, Quarta: 4, Quinta: 4, Sexta: 4, Sábado: 5, Domingo: 4 },
    { Segunda: 5, Terça: 4, Quarta: 4, Quinta: 4, Sexta: 4, Sábado: 5, Domingo: 5 },
    { Segunda: 4, Terça: 5, Quarta: 5, Quinta: 5, Sexta: 4, Sábado: 4, Domingo: 4 },
    { Segunda: 4, Terça: 4, Quarta: 4, Quinta: 5, Sexta: 5, Sábado: 5, Domingo: 4 },
    { Segunda: 5, Terça: 4, Quarta: 4, Quinta: 4, Sexta: 4, Sábado: 5, Domingo: 5 },
    { Segunda: 4, Terça: 5, Quarta: 5, Quinta: 5, Sexta: 4, Sábado: 4, Domingo: 4 },
    { Segunda: 4, Terça: 4, Quarta: 4, Quinta: 4, Sexta: 5, Sábado: 5, Domingo: 5 }
  ];

  const [modalidade, setModalidade] = useState("regular");
  const [horasPorDia, setHorasPorDia] = useState({
    Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0, Sábado: 0, Domingo: 0
  });

  const calcularHorasMensais = () => {
    return calendario.map((diasNoMes) => {
      let total = 0;
      for (const dia in diasNoMes) {
        total += diasNoMes[dia] * (horasPorDia[dia] || 0);
      }
      return total;
    });
  };

  const totalMensal = calcularHorasMensais();
  const totalAno = totalMensal.reduce((acc, val) => acc + val, 0);
  const totalSemana = Object.values(horasPorDia).reduce((a, b) => a + b, 0);

  let meta = modalidade === "regular" ? 600 : modalidade === "aux30" ? 30 : 15;
  let tipoMeta = modalidade === "regular" ? "anual" : "mensal";
  
  let mesMeta600 = null;
  if (modalidade === "regular") {
    let acumulado = 0;
    for (let i = 0; i < totalMensal.length; i++) {
      acumulado += totalMensal[i];
      if (acumulado >= 600) {
        mesMeta600 = i;
        break;
      }
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Planejador de Horas</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setModalidade("regular")} className={`px-4 py-2 rounded ${modalidade === "regular" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Pioneiro Regular</button>
        <button onClick={() => setModalidade("aux30")} className={`px-4 py-2 rounded ${modalidade === "aux30" ? "bg-green-600 text-white" : "bg-gray-200"}`}>Auxiliar 30h</button>
        <button onClick={() => setModalidade("aux15")} className={`px-4 py-2 rounded ${modalidade === "aux15" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}>Auxiliar 15h</button>
      </div>

      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Dia</th>
            <th className="p-2 border">Horas</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(horasPorDia).map((dia) => (
            <tr key={dia}>
              <td className="p-2 border">{dia}</td>
              <td className="p-2 border text-center">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={horasPorDia[dia]}
                  onChange={(e) => setHorasPorDia({ ...horasPorDia, [dia]: parseFloat(e.target.value) || 0 })}
                  className="w-20 text-center border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mb-2">Resumo</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Mês</th>
            <th className="p-2 border">Total de Horas</th>
            <th className="p-2 border">Meta</th>
          </tr>
        </thead>
        <tbody>
          {meses.map((mes, index) => {
            const horas = totalMensal[index];
            const atingiu = tipoMeta === "mensal" ? horas >= meta : false;
            const destaque600 = modalidade === "regular" && index === mesMeta600;
            return (
              <tr key={mes} className={destaque600 ? "bg-blue-100 font-bold" : ""}>
                <td className="p-2 border">{mes}</td>
                <td className="p-2 border text-center">{horas.toFixed(1)}</td>
                <td className="p-2 border text-center">
                  {tipoMeta === "mensal" ? (atingiu ? "✅" : "❌") : (destaque600 ? "Meta 600h atingida" : "-")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p><strong>Total semanal:</strong> {totalSemana.toFixed(1)}h</p>
        <p><strong>Total anual:</strong> {totalAno.toFixed(1)}h</p>
        {modalidade !== "regular" && (
          <p><strong>Faltam para 600h:</strong> {(600 - totalAno > 0 ? 600 - totalAno : 0).toFixed(1)}h</p>
        )}
      </div>
    </div>
  );
}
