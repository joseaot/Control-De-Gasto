import React from 'react'
import Controlpresupuesto from './Controlpresupuesto'
import Nuevopresupuesto from './Nuevopresupuesto'
import logo from '../../public/favicon.ico'
import stylos from '../components/Header.module.css'




function Header({gastos, presupuesto, setPresupuesto, isValidPresupuesto , setIsValidPresupuesto, setGastos}) {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        <a target="_blank" href='https://biolink.info/joseaot'> <img src={logo} className={stylos.logo}/> </a><img/>

        {isValidPresupuesto ? (
          <Controlpresupuesto
             gastos={gastos}
             setGastos={setGastos}
             presupuesto={presupuesto}
             setPresupuesto={setPresupuesto}
             setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ):(
          <Nuevopresupuesto
            presupuesto= {presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}
    </header>
  )
}

export default Header