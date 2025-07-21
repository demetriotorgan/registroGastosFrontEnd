import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './GraficoPizza.css'

const cores = ['#2d455eff', '#9af087ff'];

export default function GraficoPizza({ titulo, data }) {
  return (
    <div className="grafico-container">
      <h3>{titulo}</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ value }) =>
            `Valor: ${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value)}`
          }
        >
          {data.map((_, index) => (
            <Cell key={index} fill={cores[index % cores.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value)
          }
        />
        <Legend />
      </PieChart>
    </div>
  );
}
