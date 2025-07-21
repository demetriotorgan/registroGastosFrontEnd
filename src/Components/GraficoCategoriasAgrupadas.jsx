import './GraficoCategoriasAgrupadas.css'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export function GraficoCategoriasAgrupado({ registros }) {
  // Filtra registros que possuem categoria
  const registrosComCategoria = registros.filter(r => r.categoria && r.categoria.trim() !== '');

  // Se não há registros com categoria, não exibe nada
  if (registrosComCategoria.length === 0) {
    return (
      <div className="graficos-container">
        <p style={{ textAlign: 'center', color: '#777' }}>
          📊 Nenhum gráfico exibido. Os registros ainda não possuem categorias atribuídas.
        </p>
      </div>
    );
  }

  // Função para agrupar dados
  const agruparDados = (registros, tipoFiltro) => {
    const categorias = {};

    registros.forEach((r) => {
      if (r.tipo !== tipoFiltro || !r.categoria) return;

      if (!categorias[r.categoria]) {
        categorias[r.categoria] = { categoria: r.categoria, essencial: 0, 'nao-essencial': 0 };
      }

      categorias[r.categoria][r.gasto] += r.valor;
    });

    return Object.values(categorias);
  };

  const dadosDebito = agruparDados(registrosComCategoria, 'debito');
  const dadosCredito = agruparDados(registrosComCategoria, 'credito');

  return (
    <div className="graficos-container">
      <h3>📉 Gastos por Categoria (Débito)</h3>
      <div className="grafico-box">
        <ResponsiveContainer>
          <BarChart data={dadosDebito} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Valor']} />
            <Legend />
            <Bar dataKey="essencial" fill="#4caf50" name="Essencial" radius={[4, 4, 0, 0]} />
            <Bar dataKey="nao-essencial" fill="#f44336" name="Não Essencial" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3>📈 Ganhos por Categoria (Crédito)</h3>
      <div className="grafico-box">
        <ResponsiveContainer>
          <BarChart data={dadosCredito} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Valor']} />
            <Legend />
            <Bar dataKey="essencial" fill="#2196f3" name="Essencial" radius={[4, 4, 0, 0]} />
            <Bar dataKey="nao-essencial" fill="#ff9800" name="Não Essencial" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
