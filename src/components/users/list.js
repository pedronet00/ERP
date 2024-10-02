import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/user');
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função do botão de novo usuário (você pode ajustar conforme necessário)
  const handleNewUser = () => {
    navigate('/user/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Usuários</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/> Novo Usuário</button>
      </div>

      <table className="table table-light table-hover" style={{marginTop: '2%'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dataNascimentoUsuario}</td>
                <td><IconX/><IconEdit/></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhum usuário encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
