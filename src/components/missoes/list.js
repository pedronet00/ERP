import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MissoesList = () => {
  

  // Função do botão de novo usuário (você pode ajustar conforme necessário)
  const handleNewUser = () => {
    alert('Função de criar novo usuário ainda não implementada!');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Missões</h2>
        <button className="btn btn-primary" onClick={handleNewUser}>Nova Missão</button>
      </div>

      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Membros</th>
            <th>Pastor titular</th>
          </tr>
        </thead>
        <tbody>
            <tr key="1">
              <td>1</td>
              <td>Missão Batista de Presidente Bernardes</td>
              <td>Presidente Bernardes</td>
              <td>15</td>
              <td>Pastor Luiz Antônio</td>
            </tr>  
            <tr key="2">
              <td>2</td>
              <td>Missão Batista de Álvares Machado</td>
              <td>Álvares Machado</td>
              <td>30</td>
              <td>Pastor Humberto Sedano</td>
            </tr>  
            <tr key="1">
              <td>1</td>
              <td>Missão Batista de Presidente Bernardes</td>
              <td>Presidente Bernardes</td>
              <td>15</td>
              <td>Pastor Luiz Antônio</td>
            </tr>  
            <tr key="1">
              <td>1</td>
              <td>Missão Batista de Presidente Bernardes</td>
              <td>Presidente Bernardes</td>
              <td>15</td>
              <td>Pastor Luiz Antônio</td>
            </tr>  
        </tbody>
      </table>
    </div>
  );
};

export default MissoesList;
