export function exportarParaCSV(registros) {
  if (!registros || registros.length === 0) return;

  const header = Object.keys(registros[0]).join(','); // cabeçalho
  const rows = registros.map(r =>
    Object.values(r).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  );

  const csvContent = [header, ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'registros.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
