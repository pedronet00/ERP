import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

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

  return (
    <div className="container mt-4">
      <h2>Lista de Departamentos</h2>
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th>Título</th>
            <th>Texto</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((department) => (
              <tr key={department.id}>
                <td>{department.tituloDepartamento}</td>
                <td>{department.textoDepartamento}</td>
                <td>{department.statusDepartamento === 1 ? 'Ativo' : 'Inativo'}</td>
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
