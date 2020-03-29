import React, { useState } from "react";
import "./styles.css";
import api from "../../services/api";

import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";

export default function Register() {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [whatsapp, setWhatsapp] = useState("");
  var [city, setCity] = useState("");
  var [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { name, email, whatsapp, city, uf };
    try {
      const response = await api.post("ongs", data);
      alert(`ID= ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro ao criar!");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero!" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro e ajude pessoas! Be the hero!</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              onChange={e => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
