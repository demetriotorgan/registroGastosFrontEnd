import React from 'react';
import './TotaisPorCategoria.css';

export function TotaisPorCategoria({ registros }) {
  const registrosComCategoria = registros.filter(r => r.categoria && r.categoria.trim() !== '');

  // Agrupamento
  const totaisPorCategoria = registrosComCategoria.reduce((acc, registro) => {
    const { categoria, gasto, valor } = registro;

    if (!acc[categoria]) {
      acc[categoria] = { essencial: 0, 'nao-essencial': 0 };
    }

    if (gasto === 'essencial' || gasto === 'nao-essencial') {
      acc[categoria][gasto] += valor;
    }

    return acc;
  }, {});

  const categorias = Object.entries(totaisPorCategoria);

  if (categorias.length === 0) {
    return <p style={{ textAlign: 'center', color: '#777' }}>Nenhuma categoria registrada para exibir os totais.</p>;
  }

  return (
    <div className="totais-container">
      {categorias.map(([categoria, valores]) => (
        <div key={categoria} className="totais-card">
          <h4>{categoria}</h4>
          <p><strong>Essencial:</strong> R$ {valores.essencial.toFixed(2)}</p>
          <p><strong>Não Essencial:</strong> R$ {valores['nao-essencial'].toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
