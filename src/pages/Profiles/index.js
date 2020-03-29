import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "../../services/api";

import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";

export default function Profile() {
  var [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  useEffect(() => {
    api
      .get("/incidents", {
        headers: {
          Authorization: ongId
        }
      })
      .then(Response => {
        setIncidents(Response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar!");
    }
  }
  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero!" />
        <span>Bem vinda, {ongName}!</span>
        <Link className="button" to="/incident/new">
          Cadastrar novo caso.
        </Link>
        <button type="submit" onClick={handleLogout}>
          <FiPower size={18} color="#E02041"></FiPower>
        </button>
      </header>
      <h1>Casos cadastrados:</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:{incident.id}</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>
            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
