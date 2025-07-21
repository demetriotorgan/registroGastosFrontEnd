export function calcularTotaisPorTipo(registros, tipo) {
  const totais = { essencial: 0, 'nao-essencial': 0 };
  registros.forEach((reg) => {
    if (reg.tipo === tipo) {
      totais[reg.gasto] += reg.valor;
    }
  });

  return [
    { name: 'Essencial', value: totais.essencial },
    { name: 'Nao Essencial', value: totais['nao-essencial'] }
  ];
}
