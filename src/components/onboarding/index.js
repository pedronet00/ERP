import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Stack, Avatar, Box } from '@mui/material';
import { IconCheck, IconRadio } from '@tabler/icons-react';

const Onboarding = () => {
  const tasks = [
    { id: 1, text: 'Criar uma conta', completed: true },
    { id: 2, text: 'Cadastrar um usuário', completed: true },
    { id: 3, text: 'Configurar finanças', completed: false },
    { id: 4, text: 'Adicionar recursos', completed: false },
    { id: 5, text: 'Criar grupos de ministérios', completed: false },
  ];

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
          {tasks.map((task) => (
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
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Onboarding;
