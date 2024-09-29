import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [cuenta, setCuenta] = useState(0)
  const [tx, setTx] = useState(null)
  useEffect(()=>{
    window.ethereum.request({
      method:"eth_requestAccounts"
    }).then(cuentas =>{
      setCuenta(cuentas[0])
      window.ethereum.on("accountsChanged", (cuentas) =>{
        setCuenta(cuentas[0])
      })
    })

  },[])

  async function invocarFacuet() {
    const url = (`http://localhost:3333/faucet/${cuenta}`)
    const response = await fetch(url)
    const json = await response.json()
    setTx(json)
  }

  return (
    <div>
      <h1>{cuenta}</h1>
      <button onClick={()=>invocarFacuet()}>Enviar 0.1 eth</button>
      <div>{JSON.stringify(tx,null,4)}</div>
   </div>
  )
}

export default App
