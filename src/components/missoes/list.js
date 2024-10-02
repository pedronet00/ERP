import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';

const MissoesList = () => {
  

  // Função do botão de novo usuário (você pode ajustar conforme necessário)
  const handleNewUser = () => {
    alert('Função de criar novo usuário ainda não implementada!');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Missões</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Nova Missão</button>
      </div>

      <table className="table table-light table-hover" style={{marginTop: '2%'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Membros</th>
            <th>Pastor titular</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
            <tr key="1">
              <td>1</td>
              <td>Missão Batista de Presidente Bernardes</td>
              <td>Presidente Bernardes</td>
              <td>15</td>
              <td>Pastor Luiz Antônio</td>
              <td><IconX/><IconEdit/></td>
            </tr>  
            <tr key="2">
              <td>2</td>
              <td>Missão Batista de Álvares Machado</td>
              <td>Álvares Machado</td>
              <td>30</td>
              <td>Pastor Humberto Sedano</td>
              <td><IconX/><IconEdit/></td>
            </tr>  
            <tr key="1">
              <td>3</td>
              <td>Missão Batista de Pirapozinho</td>
              <td>Pirapozinho</td>
              <td>12</td>
              <td>Pastor Wilson Martins</td>
              <td><IconX/><IconEdit/></td>
            </tr>  
            <tr key="1">
              <td>4</td>
              <td>Missão Batista de Regente Feijó</td>
              <td>Regente Feijó</td>
              <td>6</td>
              <td>Pastor Israel Siqueira</td>
              <td><IconX/><IconEdit/></td>
            </tr>  
        </tbody>
      </table>
    </div>
  );
};

export default MissoesList;
