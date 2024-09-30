import {useQuery} from 'react-query'
import{Link} from 'react-router-dom'
export function Productos() {
    const {data, isLoading} = useQuery("productos", ()=>{
        return fetch("http://localhost:5555/products").then(res=>res.json())
    })
    if (isLoading){
        return <div>Cargando...</div>
    }

    //return <h2>{JSON.stringify(data,null,2)}</h2>
    return (<div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {data.map(producto =>(
                    <tr key={producto.ProductID}>
                        <td><Link to={`/productos/${producto.ProductID}`}>{producto.ProductName}</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)

}