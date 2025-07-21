// utils/calcularResumoGeral.js

export function calcularResumoGeral(registros) {
  const debitos = registros.filter(r => r.tipo === 'debito');
  const creditos = registros.filter(r => r.tipo === 'credito');

  const totalDebitoEssencial = debitos
    .filter(r => r.gasto === 'essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const totalDebitoNaoEssencial = debitos
    .filter(r => r.gasto === 'nao-essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const totalCreditoEssencial = creditos
    .filter(r => r.gasto === 'essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const totalCreditoNaoEssencial = creditos
    .filter(r => r.gasto === 'nao-essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const datas = registros.map(r => new Date(r.data));
  const dataMaisAntiga = datas.length > 0 ? new Date(Math.min(...datas)) : new Date();
  const hoje = new Date();
  const diffMs = hoje - dataMaisAntiga;
  const diasRegistrados = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return {
    debitos,
    creditos,
    totalDebitoEssencial,
    totalDebitoNaoEssencial,
    totalCreditoEssencial,
    totalCreditoNaoEssencial,
    diasRegistrados
  };
}
