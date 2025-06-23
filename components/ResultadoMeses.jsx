import months from '../data/months';

function ResultadoMeses({ tipoSelecionado, distribuicaoHoras }) {
  const metaAnual = 600;
  const metaMensal =
    tipoSelecionado === 'auxiliar15' ? 15 :
    tipoSelecionado === 'auxiliar30' ? 30 :
    null;

  let acumulado = 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-3xl">
      {months.map((mes, index) => {
        const horas = distribuicaoHoras[index];
        acumulado += horas;

        const atingiuMetaAnual = tipoSelecionado === 'regular' &&
          acumulado >= metaAnual &&
          acumulado - horas < metaAnual;

        const atingiuMetaMensal = metaMensal !== null && horas >= metaMensal;

        const destaque = atingiuMetaAnual || atingiuMetaMensal
          ? 'bg-green-200 font-semibold'
          : 'bg-blue-100';

        return (
          <div
            key={mes}
            className={`p-4 rounded-lg shadow text-center ${destaque}`}
          >
            <p>{mes}</p>
            <p>{horas.toFixed(1)} horas</p>
          </div>
        );
      })}
    </div>
  );
}

export default ResultadoMeses;
