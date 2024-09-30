import datos from '../datos.json'

export function CardPrecio({data}){
    return (
        <div className='card w-100 p-2 mb-1'>
            <div className="card-header">
                <h2>{data.titulo}</h2>
            </div>
            <div className="card-body">
                <ul className='list-unstyled'>
                    {data.features.map((i, index) =>
                        <h4 key={index} className='mt-1'>{i}</h4>
                    )}
                </ul>
                <button className='btn btn-outline-primary w-100'>
                    {data.textBoton}
                </button>
            </div>
        </div>
    );
}

export function Precios(){
    return (
        <div className="d-flex justify-content-between">
            {datos.precios.map((i, index) =>
                <CardPrecio key={index} data={i} />
            )}
        </div>
    );
}
