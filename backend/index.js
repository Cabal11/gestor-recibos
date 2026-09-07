import express from "express";

const app = express();

app.get("/", (req,res) => {
    res.send("Hello World")
})

app.listen(Process.env.PORT, () => {
    console.log("Iniciado: ", process.env.PORT)
})