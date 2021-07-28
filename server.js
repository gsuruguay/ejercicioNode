const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3333;

app.use(express.static(path.join(__dirname, "client")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
})

app.get("/getFecha", (req, res) => {
    let fechaDeHoy = new Date();
    console.log(fechaDeHoy);
    res.send(`<h1>Hoy es ${fechaDeHoy.getDate()} del mes ${fechaDeHoy.getMonth() + 1} del año ${fechaDeHoy.getFullYear()}</h1>`)
})

app.get("/readTxt", (req, res) => {    
    fs.readFile("archivo.txt", { encoding: "utf-8" }, (error, data) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("Mensaje archivo .txt: ", data);
            res.send(`<h2>Mensaje archivo txt</h2><p>${data}</p>`);
        }
    })
})

app.post("/saludar", (req, res)=>{
    console.log(req.body);
    if (req.body.nombre != "") {
        res.send(`<h1>Buen día ${req.body.nombre}! Bienvenid@</h1>`)        
    }else{
        res.send("<h1>Ups! No pusiste tu nombre</h1>")
    }
})

app.listen(PORT, () => console.log(`Escuchando en ${PORT}`))