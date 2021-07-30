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

app.get("/readTxt", async (req, res) => {
    try {
        const texto = await fs.readFileSync('archivo.txt', 'utf-8');
        res.send(`<h1>${texto}</h1>`);
    } catch (err) {
        res.send(err);
    }
})

app.post("/saludar", (req, res) => {
    console.log(req.body);
    if (req.body.nombre != "") {
        res.send(`<h1>Buen día ${req.body.nombre}! Bienvenid@</h1>`)
    } else {
        res.send("<h1>Ups! No pusiste tu nombre</h1>")
    }
})

app.listen(PORT, () => console.log(`Escuchando en ${PORT}`))