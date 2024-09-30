const {createCipheriv, createECDH} = require("crypto")
const {exit} = require("process")
const args = require("yargs").argv
const fs = require("fs")

if(!args.private && !args.public && !args.data){
    console.log("Faltan parámetros para poder encriptar")
    exit(0)
}

const origen = createECDH("secp521r1")
const key = fs.readFileSync("./data/"+ args.private +".key").toString()
origen.setPrivateKey(key,"hex")


const pub = fs.readFileSync("./data/"+ args.public +".pb").toString()

//Creación de la clave secreta compartida
const secret = Uint8Array.from(origen.computeSecret(pub,"hex","binary"))
console.log("secret",secret)


//Cifrado del fichero
const algo = "aes-256-cbc"
var cifrador = createCipheriv(algo,secret.slice(0,32),secret.slice(0,16))

// //Uso de streams
 fs.createReadStream("./data/"+args.data)
     .pipe(cifrador)
     .pipe(new fs.createWriteStream("./data/"+args.public + "-" + args.data + ".enc"))

