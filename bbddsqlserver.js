const pass = require('./password.js')
console.log(pass)
const mssql = require("mssql")

const config = {
    user: "sa",
    password: pass,
    database:"northwind",
    server:"localhost",
    port:1433,
    pool:{
        min:0,
        max:10,
        idleTimeoutMillis: 30000,
    },
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
}


async function q(sql){
    try{
        await mssql.connect(config)
        const resultados = await mssql.query(sql)
        return resultados
    } catch (error){
        return error
    }   
}

q("select * from customers").then(res =>{
    console.log(res)
}).catch(e =>{
    console.log(e)
})