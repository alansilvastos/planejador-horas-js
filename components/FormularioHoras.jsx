import { useState } from 'react';

const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

function FormularioHoras({ onDistribuicaoGerada }) {
  const [horasPorDia, setHorasPorDia] = useState({
    segunda: 0,
    terca: 0,
    quarta: 0,
    quinta: 0,
    sexta: 0,
    sabado: 0,
    domingo: 0,
  });

  const handleChange = (dia, valor) => {
    setHorasPorDia({ ...horasPorDia, [dia]: Number(valor) });
  };

  const gerarDistribuicao = async () => {
    const calendario = await import('../data/calendario');
    const distribuicao = calendario.calcularHorasMensais(horasPorDia);
    onDistribuicaoGerada(distribuicao);
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h2 className="text-lg font-semibold">Quantas horas você pode fazer por dia?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {diasSemana.map((dia) => (
          <div key={dia} className="flex flex-col items-center">
            <label>{dia.charAt(0).toUpperCase() + dia.slice(1)}</label>
            <input
              type="number"
              min="0"
              value={horasPorDia[dia]}
              onChange={(e) => handleChange(dia, e.target.value)}
              className="border p-1 w-20 text-center"
            />
          </div>
        ))}
      </div>
      <button
        onClick={gerarDistribuicao}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calcular planejamento
      </button>
    </div>
  );
}

export default FormularioHoras;
