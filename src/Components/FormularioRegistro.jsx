import './FormularioRegistro.css'

function FormularioRegistro({
valor,
setValor,
tipo,
setTipo,
gasto,
setGasto,
loading,
handleSubmit,
categoria,
setCategoria
}){  
    return(
<>
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

        <label>Categoria</label>
        <select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
          <option value="supermercado">Supermercado</option>
          <option value="bebidas">Bebidas</option>
          <option value="lanche">Lanche</option>
          <option value="abastecimento">Abastecimento</option>
          <option value="outro">Outros</option>
        </select>

        <button type='submit'>Salvar</button>
      </form>      
</>
    )
}
export default FormularioRegistro;