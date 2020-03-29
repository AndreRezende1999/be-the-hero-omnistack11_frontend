import React, { useState } from "react";
import "./styles.css";

import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function NewIncident() {
  var [title, setTitle] = useState("");
  var [description, setDescription] = useState("");
  var [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = { title, description, value };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar!");
    }
  }

  return (
    <div className="newIncident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero!" />

          <h1>Cadastrar novo caso</h1>
          <p>Cadastre seu caso detalhadamente!</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais!"
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
