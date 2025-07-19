import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './App.css'

function App() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('credito');
  const [gasto, setGasto] = useState('nao-essencial');
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [registros, setRegistros] = useState([]);

  const fetchRegistros = async()=>{
    try {
      setLoadingList(true);
      const res = await fetch('https://api-registro-de-gastos.vercel.app/api/registros/all')
      const data = await res.json();
      setRegistros(data)
    } catch (error) {
      console.error('Erro ao carregar registros', error);
    }finally{
      setLoadingList(false);
    }
  }

  useEffect(()=>{
    fetchRegistros();
  },[]);

  //Calculando Resumo Geral

  const debitos = registros.filter(r=>r.tipo === 'debito')
  const totalDebitoEssencial = debitos
    .filter(r => r.gasto === 'essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);
  const totalDebitoNaoEssencial = debitos
    .filter(r => r.gasto === 'nao-essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const creditos = registros.filter(r=>r.tipo === 'credito')
  const totalCreditoEssencial = creditos
    .filter(r => r.gasto === 'essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);
    const totalCreditoNaoEssencial = creditos
    .filter(r => r.gasto === 'nao-essencial')
    .reduce((acc, cur) => acc + cur.valor, 0);

    // Dias entre o primeiro registro e hoje
  const datas = registros.map(r => new Date(r.data));
  const dataMaisAntiga = datas.length > 0 ? new Date(Math.min(...datas)) : new Date();
  const hoje = new Date();
  const diffMs = hoje - dataMaisAntiga;
  const diasRegistrados = Math.ceil(diffMs / (1000 * 60 * 60 * 24));



  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!valor || isNaN(valor) || parseFloat(valor) <=0){
      alert('⚠️ Por favor, insira um valor válido maior que zero.');
      return;
    }
    setLoading(true);

    const registro ={
      valor:parseFloat(valor),
      tipo,
      gasto 
    };

    try {
      const response = await fetch('https://api-registro-de-gastos.vercel.app/api/registros/save',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
      });
      const data = await response.json();
      console.log('✅ Registro salvo:', data);
      alert('Registro Salvo com Sucesso!')
      setValor('');
    } catch (error) {
      console.error('❌ Erro ao salvar registro:', error);
      alert('Erro ao salvar registro');
    } finally{
      setLoading(false);
      fetchRegistros();
    }
  }

  const handleDelete = async(id) =>{
    if(!window.confirm('Tem certeza que deseja excluir este registro?')) return;

    try {
      const response = await fetch(`https://api-registro-de-gastos.vercel.app/api/registros/delete/${id}`,{
        method: 'DELETE'
      });
      if(!response.ok){
        throw new Error('Erro ao exlcuir registro')
      }
      alert('Registro Excluido com sucesso')
      fetchRegistros();
    } catch (error) {
      console.error('Erro ao excluir registro')
      alert('Erro ao deletar registro')
    }
  }

  const calcularTotaisGastosDebito = ()=>{
    const totais = {essencial:0, 'nao-essencial':0}
    registros.forEach((reg)=>{
      if(reg.tipo === 'debito'){
        if(reg.gasto === 'essencial') totais.essencial +=reg.valor;
        if(reg.gasto === 'nao-essencial') totais['nao-essencial'] +=reg.valor;
      }
    });    

    return[
      {name: 'Essencial', value: totais.essencial},
      {name:'Nao Essencial', value:totais['nao-essencial']}
    ]
  }

  const calcularTotaisGastosCredito = ()=>{
    const totais = {essencial:0, 'nao-essencial':0}
    registros.forEach((reg)=>{
      if(reg.tipo === 'credito'){
        if(reg.gasto === 'essencial') totais.essencial +=reg.valor;
        if(reg.gasto === 'nao-essencial') totais['nao-essencial'] +=reg.valor;
      }
    });    

    return[
      {name: 'Essencial', value: totais.essencial},
      {name:'Nao Essencial', value:totais['nao-essencial']}
    ]
  }
  return (
    <>
      <header className="app-header">
        <div className="logo">
          <h1>💰 Finan Track</h1>
          <small>Torgan Soluções Digitais</small>
        </div>
      </header>
      {/*Overlay e Loading */}
      {loading && (
        <div className='loading-overlay'>
          <div className='loading-spinner'></div>
          <p>Salvando registro...</p>
        </div>
      )}

      <form className='formulario' onSubmit={handleSubmit}>
        <label htmlFor='valor'>Valor</label>
        <input
        type='number'
        id='valor'        
        placeholder='Valor gasto (R$)' 
        value={valor}
        onChange={(e)=>setValor(e.target.value)}/>

        <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
        </select>

        <select value={gasto} onChange={(e)=>setGasto(e.target.value)}>
          <option value="essencial">Essencial</option>
          <option value="nao-essencial">Não-Essencial</option>
        </select>

        <button type='submit'>Salvar</button>
      </form>      

      {/*Resumo Geral */}
      <div className='resumo-card'>
        <h2>📊 Resumo</h2>
        <p><strong>Dias registrados:</strong> {diasRegistrados} dias</p>

        <h3>Débitos</h3>
        <p><strong>Registros:</strong> {debitos.length}</p>
        <p><strong>Essencial:</strong> R$ {totalDebitoEssencial.toFixed(2)}</p>
        <p><strong>Não-Essencial:</strong> R$ {totalDebitoNaoEssencial.toFixed(2)}</p>
        <p><strong>Total:</strong> R$ {(totalDebitoEssencial + totalDebitoNaoEssencial).toFixed(2)}</p>

        <h3>Créditos</h3>
        <p><strong>Registros:</strong> {creditos.length}</p>
        <p><strong>Essencial:</strong> R$ {totalCreditoEssencial.toFixed(2)}</p>
        <p><strong>Não-Essencial:</strong> R$ {totalCreditoNaoEssencial.toFixed(2)}</p>
        <p><strong>Total:</strong> R$ {(totalCreditoEssencial + totalCreditoNaoEssencial).toFixed(2)}</p>
      </div>
      
      {/*Graficos */}
      {registros.length > 0 && (
  <div className="grafico-container">
    <h3>Distribuição de Gastos no Débito</h3>
    <PieChart width={300} height={300}>
      <Pie
        data={calcularTotaisGastosDebito()}
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
        <Cell fill="#2d455eff" />
        <Cell fill="#9af087ff" />
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
)}

{registros.length > 0 && (
  <div className="grafico-container">
    <h3>Distribuição de Gastos no Crédito</h3>
    <PieChart width={300} height={300}>
      <Pie
        data={calcularTotaisGastosCredito()}
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
        <Cell fill="#2d455eff" />
        <Cell fill="#9af087ff" />
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
)}

      
      <div className='registros-container'>
        {loadingList ? (
          <div className="registros-loading">
            <div className="small-spinner"></div>
            <span>Carregando registros...</span>
          </div>
        ):(
          registros.map((registro,index)=>(
          <div key={index} className='registro-card'>
            <h4>{new Date(registro.data).toLocaleDateString()}</h4>
            <p><strong>Valor:</strong> R$ {registro.valor.toFixed(2)}</p>
            <div className="detalhes">
              <span className={`tipo ${registro.tipo}`}>{registro.tipo}</span>
              <span className={`gasto ${registro.gasto}`}>{registro.gasto}</span>
            </div>
            <button className='btn-excluir' onClick={()=>handleDelete(registro._id)}>🗑️ Excluir</button>
          </div>
        ))
        )}
      </div>
    </>
  );
}

export default App;