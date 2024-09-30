import {Logo} from './Logo'
import datos from '../datos.json'

export function Header(){
    return ( <div className="my-2 d-flex justify-content-between">
            <h1 className="d-flex">
                <Logo></Logo>
                <p className="">{datos.header.nombre}</p>
            </h1>
            <h3>
                {
                    datos.header.links.map((item, index) =>
                        <a key={index} className="mx-3 text-decoration-none" href={item.url}>{item.texto}</a>
                    )
                }
            </h3>
    </div>)
}