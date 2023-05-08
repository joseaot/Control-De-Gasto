import React from 'react'
import Controlpresupuesto from './Controlpresupuesto'
import Nuevopresupuesto from './Nuevopresupuesto'


function Header({gastos, presupuesto, setPresupuesto, isValidPresupuesto , setIsValidPresupuesto, setGastos}) {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

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