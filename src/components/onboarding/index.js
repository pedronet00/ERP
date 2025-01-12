import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Stack, Avatar, Box, CircularProgress } from '@mui/material';
import { IconCheck, IconRadio } from '@tabler/icons-react';

const Onboarding = ({ onboarding }) => {
  const [taskList, setTaskList] = useState([
    { id: 1, text: 'Criar uma conta', completed: true },
    { id: 2, text: 'Cadastrar um usuário', completed: false },
    { id: 3, text: 'Adicionar recursos', completed: false },
    { id: 4, text: 'Criar grupos de ministérios', completed: false },
  ]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (onboarding) {
      const updatedTasks = [
        { id: 1, text: 'Criar uma conta', completed: true },
        { id: 2, text: 'Cadastrar um usuário', completed: onboarding.userCount > 0 },
        { id: 3, text: 'Adicionar recursos', completed: onboarding.recursosCount > 0 },
        { id: 4, text: 'Criar grupos de ministérios', completed: onboarding.departamentoCount > 0 },
      ];

      setTaskList(updatedTasks);

      const hasIncompleteTasks = updatedTasks.some(task => !task.completed);
      setShowOnboarding(hasIncompleteTasks);
    }
  }, [onboarding]);

  // if (!showOnboarding) return null;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 3, borderRadius: 1 }}>
      <Box sx={{ width: { xs: '0%', md: '40%' }, display: { xs: 'none', md: 'block' } }}>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/employee-onboarding-illustration-download-in-svg-png-gif-file-formats--job-business-activities-pack-illustrations-6178707.png"
          alt="Onboarding"
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Box>

      <CardContent sx={{ width: '100%', paddingLeft: 4 }}>
        <Typography variant="h5" gutterBottom>
          Onboarding
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Complete os passos para que a sua conta fique completa:
        </Typography>

        <List>
          {taskList.map((task) => (
            <ListItem key={task.id} sx={{ paddingLeft: 0 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: task.completed ? 'green' : 'grey.300' }}>
                  {task.completed ? (
                    <IconCheck sx={{ color: 'white' }} />
                  ) : (
                    <IconRadio sx={{ color: 'grey.500' }} />
                  )}
                </Avatar>

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
