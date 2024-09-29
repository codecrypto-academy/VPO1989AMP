const { Web3 } = require("web3");
const web3 = new Web3("http://localhost:8546");

const express = require("express");
const cors = require("cors"); // Importar cors antes de usarlo

const app = express();
app.use(cors()); // Usar cors middleware
app.listen(3333);

const fs = require("fs")
const json = JSON.parse(fs.readFileSync("../nodo/data/keystore/UTC--2024-03-28T09-48-47.373219616Z--02fc7758fd4d095fd2245d05576b609c8f9ce6b5"))
console.log(json)

app.get("/balance/:address", async(req, res) => {
    web3.eth.getBalance(req.params.address)
    .then(saldo => {
        res.send(saldo);
    }).catch(err => {
        res.send(err);
    });
});

app.get("/faucet/:address", async(req,res)=>{
    const account = await web3.eth.accounts.decrypt(json,  "1234")
    const tx  = {
        chainId:8888,
        to: req.params.address,
        from: account.address,
        gasPrice: 30000,
        value: web3.utils.toWei("0.1", 'ether')
    }
    const txSigned = await account.signTransaction(tx)
    const respuesta = await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
    res.send(respuesta)
});
