import {useQuery} from 'react-query'
import { useParams } from 'react-router-dom'
import{useForm} from 'react-hook-form'
import { useContext } from 'react'
import {Context} from './App'

export function Producto() {
    const params = useParams()
    const [estado,setEstado]=useContext(Context)
    const cantidad = estado.cesta.find(i=>i.producto.ProductID== params.id)?.cantidad

    const {register, handleSubmit} = useForm(
        {
            defaultValues:{cantidad:cantidad}
        }
    )
    
    const {data, isLoading} = useQuery("producto", ()=>{
        return fetch(`http://localhost:5555/products/${params.id}`).then(res=>res.json())
    })

    function onSubmit(datos){
        console.log(datos)
        setEstado({
            ...estado, cesta:
                [...estado.cesta.filter(i=>i.producto.ProductID != data[0].ProductID),
            {
                producto:data[0],
                cantidad:datos.cantidad,
                total:datos.cantidad * data[0].UnitPrice
            }]
        })
    }
    if (isLoading){
        return <div>Cargando...</div>
    }
    return  (<div>
        <h3>Producto</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <td>{data[0].ProductID}</td>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <td>{data[0].ProductName}</td>
                </tr>
                <tr>
                    <th>Precio</th>
                    <td>{data[0].UnitPrice}</td>
                </tr>
            </thead>
        </table>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Introduzca la cantidad</label>
                <input {...register('cantidad')} type="number" className='form-control'></input>
            </div>
            <button className='btn btn-primary mt-3'>Aádir al carrito</button>
        </form>
        <div>
            {JSON.stringify(estado)}
        </div>
    </div>)
}