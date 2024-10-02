import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CriarDepartamento = () => {
  const [tituloDepartamento, setTituloDepartamento] = useState('');
  const [textoDepartamento, setTextoDepartamento] = useState('');
  const [imgDepartamento, setImgDepartamento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoDepartamento = {
      tituloDepartamento,
      textoDepartamento,
      imgDepartamento,
    };

    axios.post('https://apoleon.com.br/api-estagio/public/api/departamentos', novoDepartamento)
      .then(() => {
        Swal.fire(
          'Departamento Criado!',
          'O departamento foi criado com sucesso.',
          'success'
        );
        // Limpa os campos após o sucesso
        setTituloDepartamento('');
        setTextoDepartamento('');
        setImgDepartamento('');
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
            'Houve um problema ao criar o departamento.',
            'error'
          );
        }
      });
  };

  return (
    <div className="container">
      <h2>Criar Novo Departamento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tituloDepartamento" className="form-label">Título do Departamento</label>
          <input
            type="text"
            className="form-control"
            id="tituloDepartamento"
            value={tituloDepartamento}
            onChange={(e) => setTituloDepartamento(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="textoDepartamento" className="form-label">Texto do Departamento</label>
          <textarea
            className="form-control"
            id="textoDepartamento"
            value={textoDepartamento}
            onChange={(e) => setTextoDepartamento(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imgDepartamento" className="form-label">Imagem URL do Departamento</label>
          <input
            type="text"
            className="form-control"
            id="imgDepartamento"
            value={imgDepartamento}
            onChange={(e) => setImgDepartamento(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar Departamento</button>
      </form>
    </div>
  );
};

export default CriarDepartamento;
