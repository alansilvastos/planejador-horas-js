const meses = [
  'Setembro 2025', 'Outubro 2025', 'Novembro 2025', 'Dezembro 2025',
  'Janeiro 2026', 'Fevereiro 2026', 'Março 2026', 'Abril 2026',
  'Maio 2026', 'Junho 2026', 'Julho 2026', 'Agosto 2026'
];

const calendario = [
  { segunda: 5, terca: 4, quarta: 4, quinta: 4, sexta: 4, sabado: 4, domingo: 4 },
  { segunda: 4, terca: 5, quarta: 5, quinta: 5, sexta: 5, sabado: 4, domingo: 4 },
  { segunda: 4, terca: 4, quarta: 4, quinta: 4, sexta: 4, sabado: 5, domingo: 5 },
  { segunda: 5, terca: 5, quarta: 5, quinta: 4, sexta: 4, sabado: 4, domingo: 4 },
  { segunda: 4, terca: 4, quarta: 5, quinta: 5, sexta: 5, sabado: 4, domingo: 4 },
  { segunda: 4, terca: 4, quarta: 4, quinta: 4, sexta: 4, sabado: 5, domingo: 4 },
  { segunda: 5, terca: 4, quarta: 4, quinta: 4, sexta: 4, sabado: 5, domingo: 5 },
  { segunda: 4, terca: 5, quarta: 5, quinta: 5, sexta: 4, sabado: 4, domingo: 4 },
  { segunda: 4, terca: 4, quarta: 4, quinta: 5, sexta: 5, sabado: 5, domingo: 4 },
  { segunda: 5, terca: 4, quarta: 4, quinta: 4, sexta: 4, sabado: 5, domingo: 5 },
  { segunda: 4, terca: 5, quarta: 5, quinta: 5, sexta: 4, sabado: 4, domingo: 4 },
  { segunda: 4, terca: 4, quarta: 4, quinta: 4, sexta: 5, sabado: 5, domingo: 5 }
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
