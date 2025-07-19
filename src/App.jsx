import './App.css'

function App() {
  return (
    <>
      <header className="app-header">
        <div className="logo">
          <h1>💰 Finan Track</h1>
          <small>Torgan Soluções Digitais</small>
        </div>
      </header>
      <div className='formulario'>
        <label htmlFor='valor'>Valor</label>
        <input
        type='text'
        placeholder='Valor gasto (R$)' />
        <select>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
        </select>
        <select>
          <option value="essencial">Essencial</option>
          <option value="nao-essencial">Não-Essencial</option>
        </select>
        <button>Salvar</button>
      </div>
    </>
  );
}

export default App;