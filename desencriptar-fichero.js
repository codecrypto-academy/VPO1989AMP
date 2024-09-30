 const {createECDH,createDecipheriv }=require("crypto")
 const {argv} = require("process")
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

const secret = Uint8Array.from(origen.computeSecret(pub,"hex","binary"))

//Cifrado del fichero
const algo = "aes-256-cbc"
var descifrador = createDecipheriv(algo,secret.slice(0,32),secret.slice(0,16))
const inputFile = "./data/"+args.private + "-" + args.data + ".enc"
//console.log(inputFile)
const texto = fs.readFileSync(inputFile).toString()
//console.log(texto)
let desencriptado = descifrador.update(texto,'hex',"utf-8")
desencriptado += descifrador.final("utf-8")
console.log(desencriptado)

const outputFile = "./data/"+args.private + "-" + args.data + ".des"
fs.writeFileSync(outputFile,desencriptado)