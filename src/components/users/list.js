import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

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
    alert('Função de criar novo usuário ainda não implementada!');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Usuários</h2>
        <button className="btn btn-primary" onClick={handleNewUser}>Novo Usuário</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.dataNascimentoUsuario}</td>
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
