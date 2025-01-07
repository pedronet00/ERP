import React from 'react';
import { Box, Typography, Container, Divider, Stack } from '@mui/material';
import Navbar from './navbar';

const TermsAndConditions = () => {
  return (
    <div>
        <Navbar backgroundColor='#1e3b8b'/>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1e3b8b', fontWeight: 'bold' }}>
          Termos e Condições
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          {/* 1. Uso do Serviço */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}>1. Uso do Serviço</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Ao acessar e utilizar o sistema Aliance, você concorda em seguir os termos e condições abaixo descritos. Este sistema foi desenvolvido para otimizar a gestão de igrejas, fornecendo ferramentas para o controle de membros, finanças, eventos e relatórios. O uso do sistema é destinado exclusivamente a organizações religiosas, como igrejas, templos e outras entidades sem fins lucrativos. O uso para fins comerciais é estritamente proibido.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Você é responsável por garantir a segurança e a confidencialidade de suas credenciais de acesso. Qualquer atividade realizada no sistema utilizando suas credenciais será de sua responsabilidade.
            </Typography>
          </Box>

          {/* 2. Proteção de Dados */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}>2. Proteção de Dados</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O Aliance tem como compromisso a proteção dos dados pessoais e sensíveis fornecidos pelos usuários durante o uso do sistema. Todas as informações armazenadas são tratadas em conformidade com as leis de proteção de dados aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD). 
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Os dados pessoais coletados serão utilizados exclusivamente para fornecer os serviços descritos e melhorar a experiência do usuário. Não compartilharemos ou venderemos suas informações a terceiros sem o seu consentimento expresso, salvo quando necessário para cumprimento de obrigações legais ou para o funcionamento dos serviços (como processadores de pagamento).
            </Typography>
          </Box>

          {/* 3. Alterações nos Termos */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}> 3. Alterações nos Termos</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O Aliance se reserva o direito de alterar ou atualizar estes Termos e Condições a qualquer momento, de acordo com as mudanças nas leis ou nas políticas internas. Qualquer alteração será comunicada aos usuários por e-mail ou por aviso no painel do sistema, e será válida a partir da data de sua publicação.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              É responsabilidade do usuário revisar regularmente os Termos e Condições para se manter informado sobre as alterações. O uso contínuo do sistema após a modificação dos termos será considerado como aceitação das mudanças.
            </Typography>
          </Box>

          {/* 4. Limitação de Responsabilidade */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}> 4. Limitação de Responsabilidade</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O Aliance não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou da incapacidade de usar o sistema, incluindo, mas não se limitando a perda de dados, lucros ou interrupção de negócios.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Embora o Aliance se esforce para garantir a disponibilidade contínua do sistema, não podemos garantir que o serviço esteja livre de falhas, erros ou interrupções. Em caso de falhas técnicas, faremos o possível para resolver o problema de forma rápida, mas não assumimos responsabilidade por qualquer dano causado por falhas no sistema.
            </Typography>
          </Box>

          {/* 5. Direitos de Propriedade Intelectual */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}>5. Direitos de Propriedade Intelectual</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O sistema Aliance é protegido por direitos autorais e outras leis de propriedade intelectual. Todos os conteúdos, designs, marcas, logos, textos, gráficos, imagens e software pertencem exclusivamente ao Aliance ou aos seus licenciadores. O usuário não possui direitos sobre esses materiais, exceto pelo uso permitido nos Termos e Condições.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              É proibida a reprodução, modificação, distribuição, exibição ou qualquer outro uso dos conteúdos do sistema sem o consentimento prévio por escrito do Aliance.
            </Typography>
          </Box>

          {/* 6. Rescisão do Serviço */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}>6. Rescisão do Serviço</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O usuário pode solicitar a rescisão de sua conta a qualquer momento, o que resultará no cancelamento do acesso aos serviços. Caso o usuário opte por cancelar a assinatura, qualquer valor pago não será reembolsado, salvo em caso de cláusulas específicas previstas no contrato.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O Aliance se reserva o direito de encerrar ou suspender o acesso de um usuário que violar os Termos e Condições ou que realizar atividades fraudulentas ou ilegais. Nesse caso, o usuário será notificado sobre a rescisão da conta.
            </Typography>
          </Box>

          {/* 7. Modificações no Sistema */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}> 7. Modificações no Sistema</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O Aliance pode, a qualquer momento, modificar, atualizar ou interromper o sistema, incluindo a adição ou remoção de funcionalidades. Isso pode ocorrer para melhorias do sistema ou ajustes em conformidade com mudanças nas leis ou nos requisitos técnicos.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              O Aliance se esforçará para minimizar os impactos dessas modificações e, sempre que possível, fornecerá um aviso prévio aos usuários sobre as alterações importantes no serviço.
            </Typography>
          </Box>

          {/* 8. Contato */}
          <Box>
            <Typography variant="h3" sx={{ color: '#404e90' }}>8. Contato</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Se você tiver alguma dúvida ou preocupação em relação aos Termos e Condições, entre em contato conosco através do e-mail <strong>suporte@aliance.com.br</strong> ou pelo telefone <strong>(11) 1234-5678</strong>.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Estamos à disposição para esclarecer qualquer questão e ajudar no que for necessário para o bom uso do sistema.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
    </div>
  );
};

export default TermsAndConditions;
