import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Stack, Avatar, Box, Skeleton } from '@mui/material';
import { IconCheck, IconRadio } from '@tabler/icons-react';
import axios from 'axios';

const Onboarding = () => {
  const idCliente = localStorage.getItem('idCliente');
  
  // Estado para armazenar o progresso das tarefas
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Criar uma conta', completed: true },
    { id: 2, text: 'Cadastrar um usuário', completed: false },
    { id: 3, text: 'Adicionar recursos', completed: false },
    { id: 4, text: 'Criar grupos de ministérios', completed: false },
  ]);
  
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para verificar se as tarefas foram concluídas
  const checkTaskStatus = async () => {
    try {
      // Cadastrar um usuário
      const userResponse = await axios.get(`http://localhost:8000/api/userCount?idCliente=${idCliente}`);
      const userCompleted = userResponse.data.quantidade_usuarios > 0;

      // Adicionar recursos
      const recursoResponse = await axios.get(`http://localhost:8000/api/recurso?idCliente=${idCliente}`);
      const recursoCompleted = recursoResponse.data.length > 0;

      // Criar grupos de ministérios
      const departamentoResponse = await axios.get(`http://localhost:8000/api/departamentos?idCliente=${idCliente}`);
      const departamentoCompleted = departamentoResponse.data.length > 0;

      // Atualiza o estado das tarefas
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === 2) {
            return { ...task, completed: userCompleted };
          } else if (task.id === 3) {
            return { ...task, completed: recursoCompleted };
          } else if (task.id === 4) {
            return { ...task, completed: departamentoCompleted };
          }
          return task;
        })
      );
    } catch (error) {
      console.error("Erro ao verificar o status das tarefas:", error);
    } finally {
      setLoading(false); // Quando terminar, interrompe o carregamento
    }
  };

  // Chama a função para verificar o status das tarefas ao carregar o componente
  useEffect(() => {
    checkTaskStatus();
  }, []);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 3, borderRadius: 1 }}>
      {/* Lado da imagem */}
      <Box sx={{ width: '40%' }}>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/employee-onboarding-illustration-download-in-svg-png-gif-file-formats--job-business-activities-pack-illustrations-6178707.png"
          alt="Onboarding"
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Box>

      {/* Lado da lista de tarefas */}
      <CardContent sx={{ width: '60%', paddingLeft: 4 }}>
        <Typography variant="h5" gutterBottom>
          Onboarding
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Complete os passos para que a sua conta fique completa:
        </Typography>

        {/* Lista de tarefas */}
        <List>
          {loading ? (
            // Mostra os skeletons enquanto carrega
            [1, 2, 3, 4].map((skeletonId) => (
              <ListItem key={skeletonId} sx={{ paddingLeft: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* Skeleton para ícone */}
                  <Skeleton variant="circular" width={40} height={40} />

                  {/* Skeleton para o texto */}
                  <Skeleton variant="rectangular" width="200px" height={30} />
                </Stack>
              </ListItem>
            ))
          ) : (
            // Lista real de tarefas quando os dados já carregaram
            tasks.map((task) => (
              <ListItem key={task.id} sx={{ paddingLeft: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* Ícone baseado no estado de conclusão */}
                  <Avatar sx={{ bgcolor: task.completed ? 'green' : 'grey.300' }}>
                    {task.completed ? (
                      <IconCheck sx={{ color: 'white' }} />
                    ) : (
                      <IconRadio sx={{ color: 'grey.500' }} />
                    )}
                  </Avatar>

                  {/* Texto da tarefa */}
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: task.completed ? 'green' : 'grey.500',
                          textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                      >
                        {task.text}
                      </Typography>
                    }
                  />
                </Stack>
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default Onboarding;
