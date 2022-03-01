const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"banco",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req,res) => { //pegar todos os campos do BANCO DE DADOS
    const { nome } = req.body;
    const { email } = req.body;
    const { senha } = req.body;

    // console.log(nome); TESTAR O BANCO DE DADOS

    let SQL = "INSERT INTO usuarios (nome, email, senha) VALUES ( ?,?,? )"; // Inserindo Dados no banco.

    db.query (SQL,[nome, email, senha], (err, result)=>{ //Enviando para BANCO DE DADOS
    console.log(err);
    });
});

app.get("/getCards", (req, res) =>{
    let SQL = "SELECT * FROM usuarios"; //Selecionando toda tabela usuarios

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.listen(3001, () => {
    console.log("rodando servidor");
});