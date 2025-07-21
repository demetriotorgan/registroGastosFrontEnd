import './RegistroContainer.css'; // opcional: se quiser estilizar separado

const RegistroContainer = ({ registros, loadingList, excluirRegistro }) => {
  return (
    <div className='registros-container'>
      {loadingList ? (
        <div className="registros-loading">
          <div className="small-spinner"></div>
          <span>Carregando registros...</span>
        </div>
      ) : (
        registros.map((registro, index) => (
          <div key={index} className='registro-card'>
            <h4>{new Date(registro.data).toLocaleDateString()}</h4>
            <p><strong>Valor:</strong> R$ {registro.valor.toFixed(2)}</p>
            <p>
              <strong>Categoria:</strong>{' '}
              <span className={`categoria ${registro.categoria?.toLowerCase().replace(' ', '-')}`}>
                {registro.categoria}
              </span>
            </p>
            <div className="detalhes">
              <span className={`tipo ${registro.tipo}`}>{registro.tipo}</span>
              <span className={`gasto ${registro.gasto}`}>{registro.gasto}</span>              
            </div>
            <button
              className='btn-excluir'
              onClick={() => excluirRegistro(registro._id)}
            >
              🗑️ Excluir
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RegistroContainer;
