// src/hooks/useSalvarRegistro.js
import { useState } from 'react';

export function useSalvarRegistro(fetchRegistros) {
  const [loading, setLoading] = useState(false);

  const salvarRegistro = async ({ valor, tipo, gasto, categoria, onSuccess }) => {
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      alert('⚠️ Por favor, insira um valor válido maior que zero.');
      return;
    }

    setLoading(true);

    const registro = {
      valor: parseFloat(valor),
      tipo,
      gasto,
      categoria
    };

    try {
      const response = await fetch('https://api-registro-de-gastos.vercel.app/api/registros/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro),
      });
      const data = await response.json();
      console.log('✅ Registro salvo:', data);
      alert('Registro salvo com sucesso!');
      if (onSuccess) onSuccess(); // callback para limpar campos, etc.
    } catch (error) {
      console.error('❌ Erro ao salvar registro:', error);
      alert('Erro ao salvar registro');
    } finally {
      setLoading(false);
      fetchRegistros();
    }
  };

  return { salvarRegistro, loading };
}
