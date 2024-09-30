const oracledb = require('oracledb');

try {
    oracledb.initOracleClient({
        libDir: "c:\\clienteOracle"
    });
} catch(error){
    console.log(error);
}

let pool = null;

async function createPool() {
    if (!pool) {
        try {
            pool = await oracledb.createPool({
                user: "C##datos",
                password: "datos",
                connectString: "localhost:152/XE"
            });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

async function q(sql, parametros) {
    let connection;
    try {
        await createPool();
        connection = await oracledb.getConnection();
        const resultados = await connection.execute(sql, parametros, {
            outFormat: oracledb.OUT_FORMAT_ARRAY
        });
        return resultados;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch(err) {
                console.log(err);
                throw err;
            }
        }
    }
}

q("select * from customers", []).then(r => {
    console.log(r);
}).catch(e => {
    console.log(e);
});
