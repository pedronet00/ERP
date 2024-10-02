import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nivelUsuario, setNivelUsuario] = useState(1);
  const [dataNascimentoUsuario, setDataNascimentoUsuario] = useState('');
  const [imgUsuario, setImgUsuario] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      nivelUsuario,
      dataNascimentoUsuario,
      imgUsuario,
    };

    try {
      await axios.post('https://apoleon.com.br/api-estagio/public/api/user', newUser);
      alert('Usuário criado com sucesso!');
      onUserCreated(); // Chamando a função passada como props para atualizar a lista
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert('Erro ao criar usuário. Tente novamente.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nível de Usuário</label>
          <input
            type="number"
            className="form-control"
            value={nivelUsuario}
            onChange={(e) => setNivelUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            value={dataNascimentoUsuario}
            onChange={(e) => setDataNascimentoUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagem do Usuário (URL ou nome)</label>
          <input
            type="text"
            className="form-control"
            value={imgUsuario}
            onChange={(e) => setImgUsuario(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar Usuário</button>
      </form>
    </div>
  );
};

export default CreateUser;
