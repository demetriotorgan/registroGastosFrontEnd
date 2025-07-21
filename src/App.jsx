import { useState } from 'react';
import './App.css'
import Header from './Components/Header';
import FormularioRegistro from './Components/FormularioRegistro';
import { useRegistros } from './Hooks/useRegistros';
import { useSalvarRegistro } from './Hooks/useSalvarRegistro';
import { useExcluirRegistro } from './Hooks/useExcluirRegistro';
import GraficoPizza from './Components/GraficoPizza';
import { calcularTotaisPorTipo } from './utils/Calculo';
import { calcularResumoGeral } from './utils/CalcularResumoGeral';
import ResumoGeral from './Components/ResumoGeral';
import RegistroContainer from './Components/RegistroContainer';
import { exportarParaCSV } from './utils/ExportarCSV';
import { GraficoCategoriasAgrupado } from './Components/GraficoCategoriasAgrupadas';
import { TotaisPorCategoria } from './Components/TotaisPorCategoria';

function App() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('credito');
  const [gasto, setGasto] = useState('nao-essencial');
  const [categoria, setCategoria] = useState("supermercado")
  
  //Hooks
  const {registros, loadingList, fetchRegistros} = useRegistros();
  const {salvarRegistro, loading} = useSalvarRegistro(fetchRegistros);
  const {excluirRegistro} = useExcluirRegistro(fetchRegistros);
  
  //Calculando Resumo Geral
  const {
  debitos,
  creditos,
  totalDebitoEssencial,
  totalDebitoNaoEssencial,
  totalCreditoEssencial,
  totalCreditoNaoEssencial,
  diasRegistrados
} = calcularResumoGeral(registros);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    salvarRegistro({
      valor,
      tipo,
      gasto,
      categoria,
      onSuccess: ()=>{
        setValor('');
        setCategoria('supermercado')
      }
    });
  };
    
  return (
    <>
      <Header/>          
      <FormularioRegistro        
        valor={valor}
        setValor={setValor}
        tipo={tipo}
        setTipo={setTipo}
        gasto={gasto}
        setGasto={setGasto}
        loading={loading}
        handleSubmit={handleSubmit}
        categoria={categoria}
        setCategoria={setCategoria}
        />  

      <ResumoGeral
        diasRegistrados={diasRegistrados}
        debitos={debitos}
        totalDebitoEssencial={totalDebitoEssencial}
        totalDebitoNaoEssencial={totalDebitoNaoEssencial}
        creditos={creditos}
        totalCreditoEssencial={totalCreditoEssencial}
        totalCreditoNaoEssencial={totalCreditoNaoEssencial}/>             

      <GraficoCategoriasAgrupado
      registros={registros}/>

      <TotaisPorCategoria
      registros={registros}
      />

      {registros.length > 0 && (
  <>
    <GraficoPizza
      titulo="Distribuição de Gastos no Débito"
      data={calcularTotaisPorTipo(registros, 'debito')}/>
    <GraficoPizza
      titulo="Distribuição de Gastos no Crédito"
      data={calcularTotaisPorTipo(registros, 'credito')}/>
  </>
)}
   <RegistroContainer
    registros={registros}
    loadingList={loadingList}
    excluirRegistro={excluirRegistro}/>      
    </>
  );
}

export default App;