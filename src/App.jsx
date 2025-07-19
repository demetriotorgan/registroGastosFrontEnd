import { useEffect, useState } from 'react';
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
  },[])

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
      
      {/*Grafico */}

      
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