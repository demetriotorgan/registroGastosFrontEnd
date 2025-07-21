// src/hooks/useExcluirRegistro.js
export function useExcluirRegistro(fetchRegistros) {
  const excluirRegistro = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este registro?')) return;

    try {
      const response = await fetch(`https://api-registro-de-gastos.vercel.app/api/registros/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir registro');
      }
      alert('Registro excluído com sucesso');
      fetchRegistros(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      alert('Erro ao deletar registro');
    }
  };

  return { excluirRegistro };
}
