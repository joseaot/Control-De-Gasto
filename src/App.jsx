import { useState, useEffect } from 'react'
import Filtros from './components/Filtros'
import Header from './components/Header'
import ListadosGastos from './components/ListadosGastos'
import Modal from './components/Modal'
import { generarID } from './Helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { Helmet } from 'react-helmet'





function App() {

  const [gastos, setGastos]= useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number (localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto]= useState(false)
  const [modal, setModal]=useState(false)
  const [animarModal, setAnimarModal]=useState(false)
  const [gastoEditar, setGastoEditar]= useState({})
  const [filtro, setFiltro]= useState('')
  const [gastosFiltrados, setGastosFiltrados]= useState([])


  useEffect(() => {
    if(Object.keys(gastoEditar).length>0){
      setModal(true)

      setTimeout(() => {
      setAnimarModal(true)
      }, 500);
    }

  }, [gastoEditar])


  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);

  }, [gastos])



  useEffect(()=>{
    if(filtro){
      const gastosFiltrados= gastos.filter(gasto => gasto.categoria=== filtro)


      setGastosFiltrados(gastosFiltrados)
    }

  }, [filtro]);


  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS>0){
      setIsValidPresupuesto(true)
    }
  }, [])


  





  const handleNuevoGasto=()=>{
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }


  const guardarGastos= gasto =>{
    if(gasto.id){
      const gastosActualizados= gastos.map( gastoState=> gastoState.id=== gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})

    }else{
      gasto.id=generarID();
      gasto.fecha= Date.now();
      setGastos([...gastos, gasto])
    }


    setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
  }

  const eliminarGastos= id =>{
    const gastosActualizados= gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados)

  }

  return (
    
    <div className={modal ? 'fijar': ''}>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Control de Gasto</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta name="description" content="Helmet application" />
      </Helmet>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto= {presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}

      
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadosGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGastos={eliminarGastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='IconoNuevoGasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>

      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGastos={guardarGastos}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
   
  )
}

export default App
