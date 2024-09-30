const express = require("express")
const cors = require("cors")
const db = require("./db.js")
const app = express()
app.use(cors())


app.get("/ping",async(req,res)=>{
    res.send({fecha:new Date().toISOString()})
})


app.listen(5555,()=>{
    console.log("listening")
})



app.get("/products", async (req, res) => {
    try {
        const [results, fields] = await db.q("SELECT * FROM Products", []);
        res.send(results);
    } catch (error) {
        res.send({error})
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const [results, fields] = await db.q("SELECT * FROM Products WHERE ProductID = ?", [req.params.id]);
        if (results.length > 0) {
            res.send(results);
        } 
    } catch (error) {
        res.send({error})
        
    }
});
