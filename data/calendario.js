const meses = [
  'Setembro 2025', 'Outubro 2025', 'Novembro 2025', 'Dezembro 2025',
  'Janeiro 2026', 'Fevereiro 2026', 'Março 2026', 'Abril 2026',
  'Maio 2026', 'Junho 2026', 'Julho 2026', 'Agosto 2026'
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

function calcularHorasMensais(horasPorDia) {
  return calendario.map((diasNoMes) => {
    let total = 0;
    for (const dia in diasNoMes) {
      total += diasNoMes[dia] * (horasPorDia[dia] || 0);
    }
    return total;
  });
}

export { meses as default, calcularHorasMensais };
