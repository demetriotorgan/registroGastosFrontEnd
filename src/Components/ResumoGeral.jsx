import './ResumoGeral.css'

const ResumoGeral = ({
  diasRegistrados,
  debitos,
  totalDebitoEssencial,
  totalDebitoNaoEssencial,
  creditos,
  totalCreditoEssencial,
  totalCreditoNaoEssencial
}) => {
  return (
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
      <button onClick={() => exportarParaCSV(registros)} className="botao-download">
      📥 Baixar Tabela CSV
        </button>  
    </div>
  );
};

export default ResumoGeral;
