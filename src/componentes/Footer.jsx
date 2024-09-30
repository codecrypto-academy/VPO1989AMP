import datos from '../datos.json'
function Section({data}){
    return (
        <div>
            <h3>{data.titulo}</h3> 
            <ul className='nav flex-column'>
                {
                    data.links.map((i,index)=>
                        <h5 key={index}><a className='text-decoration-none fs-5' target='blank' href={i.url}>{i.titulo}</a></h5>
                    )
                }
            </ul>
            
        </div>
    )
}

export function Footer(){
    return (<div className='d-flex justify-content-between'> 
                <h2 className="" >{datos.header.nombre}</h2>
                {
                    datos.footer.map((item,index) =>
                        <Section key={index} data={item}></Section>
                    )
                }

        </div>)
}