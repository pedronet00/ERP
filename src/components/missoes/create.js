import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MissaoCreate = () => {
  const [nomeMissao, setNomeMissao] = useState('');
  const [quantidadeMembros, setQuantidadeMembros] = useState('');
  const [cidadeMissao, setCidadeMissao] = useState('');
  const [pastorTitular, setPastorTitular] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaMissao = {
        nomeMissao,
        quantidadeMembros,
        cidadeMissao,
        pastorTitular
    };

    axios.post('https://apoleon.com.br/api-estagio/public/api/missoes', novaMissao)
      .then(() => {
        Swal.fire(
          'Missão criada!',
          'A missão foi criada com sucesso.',
          'success'
        );
        // Limpa os campos após o sucesso
        setNomeMissao('');
        setQuantidadeMembros('');
        setCidadeMissao('');
        setPastorTitular('');
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          Swal.fire(
            'Erro!',
            error.response.data.error,
            'error'
          );
        } else {
          Swal.fire(
            'Erro!',
            'Houve um problema ao criar a missão.',
            'error'
          );
        }
      });
  };

  return (
    <div className="container">
      <h2>Criar Nova Missão</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nomeMissao" className="form-label">Nome da missão</label>
          <input
            type="text"
            className="form-control"
            id="nomeMissao"
            value={nomeMissao}
            onChange={(e) => setNomeMissao(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantidadeMembros" className="form-label">Quantidade de membros</label>
          <input
            type="number"
            className="form-control"
            id="quantidadeMembros"
            value={quantidadeMembros}
            onChange={(e) => setQuantidadeMembros(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cidadeMissao" className="form-label">Cidade da missão</label>
          <input
            type="text"
            className="form-control"
            id="cidadeMissao"
            value={cidadeMissao}
            onChange={(e) => setCidadeMissao(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pastorTitular" className="form-label">Pastor titular</label>
          <input
            type="number"
            className="form-control"
            id="pastorTitular"
            value={pastorTitular}
            onChange={(e) => setPastorTitular(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar missão</button>
      </form>
    </div>
  );
};

export default MissaoCreate;
