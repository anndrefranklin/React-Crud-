import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/card";

function App() {

  const [values, setValues] = useState();
  const [listUsuarios, setListUsuarios] = useState();

  console.log(listUsuarios);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register",{
      nome: values.nome,
      email: values.email,
      senha: values.senha,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response) => {
      console.log(response);
      setListUsuarios(response.data);
    });
  },[]);


  return (
    <div className="container">
      <div className="jumbotron">
        <h3 className="register-title">Cadastro de Usuários</h3>

        <form>          
        <br/>
          <div className="row">
            <div className="col">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Nome"
                name="nome"
                onChange={handleChangeValues}
              />
            </div>

            <div className="col">
              <label>E-mail</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChangeValues}
              />
            </div>
          </div>

          <br/>
          <div className="row">
            <div className="col">
              <label>Senha</label>
              <input
                type="password"
                className="form-control"
                placeholder="Digite sua senha"
                name="senha"
                onChange={handleChangeValues}
              />
            </div>
          </div>

          <br/>
          <button type="button" className="btn btn-primary" onClick={handleClickButton}>
            Cadastrar
          </button>
        </form>

        <br/>

        {typeof listUsuarios !== "undefined" && listUsuarios.map((value) => {
          return <Card></Card>;
        })}
        
      </div>
    </div>
  );
}

export default App;
