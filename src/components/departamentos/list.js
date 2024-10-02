import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconX, IconEdit, IconPlus, IconClipboard } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate(); // Inicializar o navegador

  // Função para buscar departamentos da API
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://apoleon.com.br/api-estagio/public/api/departamentos');
      setDepartments(response.data);
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  // Usar o useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleNewUser = () => {
    navigate('/departament/create');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Departamentos</h2>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleNewUser}><IconClipboard/> Gerar Relatório</button>
        <button className="btn btn-primary" onClick={handleNewUser}><IconPlus/>Novo Departamento</button>
      </div>

      <table className="table table-light table-hover" style={{marginTop: '2%'}}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Texto</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((department) => (
              <tr key={department.id}>
                <td>{department.tituloDepartamento}</td>
                <td>{department.textoDepartamento}</td>
                <td>{department.statusDepartamento === 1 ? 'Ativo' : 'Inativo'}</td>
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

export default DepartmentList;
