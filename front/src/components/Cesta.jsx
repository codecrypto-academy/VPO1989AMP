import {useContext, useState, useEffect} from 'react'
import {Context} from './App'
import { ethers } from 'ethers';
import { Link} from 'react-router-dom'

export function Cesta() {
    const [estado, setEstado] = useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [txOk, setTxOk] = useState(null)
    const [txKo, setTxKo] = useState(null)
    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0)
    useEffect(()=>{
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then (cuentas =>{
            setCuenta(cuentas[0])
            window.ethereum.on("accountsChanged", (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    })
async function pagar(){
    const txParams = {
        to: "0xED21900caD24632a447d6889aac4D868aBAA68bA",
        from: cuenta,
        value: ethers.utils.parseEther(total.toString()).toHexString(),
    }
    console.log(txParams)
    try{
        const tx=await ethereum.request({
            method:"eth_sendTransaction",
            params:[txParams]
        })
        setTxOk(tx)
    }catch(error){
        setTxKo(error)
    }
}

    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {estado.cesta.map(i=>(
                        <tr key={i.producto.ProductID}>
                            <td>
                                <Link to={`/productos/${i.producto.ProductID}`}>
                                    {i.producto.ProductID}
                                </Link>
                            </td>
                            <td>{i.producto.ProductName}</td>
                            <td>{i.producto.UnitPrice}</td>
                            <td>{i.cantidad}</td>
                            <td>{i.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>TOTAL {total}</h3>
            <h3>{cuenta}</h3>      
            <button onClick={()=> pagar()} className='btn btn-primary'>Pagar</button>
            {txOk && <p className="alert alert-success">{txOk}</p>}
            {txKo && <p>{txKo}</p>}
        </div>
    )
}