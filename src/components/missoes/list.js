import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const MissoesList = () => {
  
  const [missoes, setMissoes] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar missões da API
  const fetchMissoes = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/missoes');
      setMissoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar missões:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchMissoes();
  }, []);

  // Função do botão de novo usuário (você pode ajustar conforme necessário)
  const handleNewUser = () => {
    navigate('/missoes/create');
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
          {missoes.length > 0 ? (
            missoes.map((missao) => (
              <tr key={missao.id}>
                <td>{missao.id}</td>
                <td>{missao.nomeMissao}</td>
                <td>{missao.cidadeMissao}</td>
                <td>{missao.quantidadeMembros}</td>
                <td>{missao.pastorTitular}</td>
                <td><IconX/><IconEdit/></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum departamento encontrado</td>
            </tr>
          )} 
        </tbody>
      </table>
    </div>
  );
};

export default MissoesList;
