export default function ResultadoMeses({ planejamento, totalAnual, tipo }) {
  const metaAnual = 600;
  const metaMensal = tipo === 'auxiliar30' ? 30 : tipo === 'auxiliar15' ? 15 : null;

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
        Resultado do Planejamento
      </h3>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="border p-2">Mês</th>
            <th className="border p-2">Horas</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(planejamento).map(([mes, horas]) => (
            <tr key={mes}>
              <td className="border p-2">{mes}</td>
              <td className="border p-2">{horas.toFixed(1)}</td>
              <td className="border p-2">
                {tipo === 'regular' && horas >= 50 && "✅"}
                {metaMensal && horas >= metaMensal && "✅"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <p className="font-semibold text-gray-700">
          Total anual: <span className="text-blue-600">{totalAnual.toFixed(1)} h</span>
        </p>
        {tipo === 'regular' && (
          <p>
            Meta anual: {metaAnual}h — {totalAnual >= metaAnual ? "✅ Alvo atingido!" : `Faltam ${(metaAnual - totalAnual).toFixed(1)}h`}
          </p>
        )}
        {tipo !== 'regular' && (
          <p>
            Faltam {(metaAnual - totalAnual).toFixed(1)}h para meta de Pioneiro Regular
          </p>
        )}
      </div>
    </div>
  );
}
