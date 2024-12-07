import {useState, React, useEffect} from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, TextField, List, ListItem, ListItemText, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { IconCurrencyDollar, IconBrandWhatsapp, IconUsersGroup, IconCalendar, IconStar, IconSchool, IconTarget, IconHeartHandshake, IconWall, IconCross, IconCheck } from '@tabler/icons-react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';


import backgroundImage from '../../assets/images/backgrounds/intro-bg.jpg';
import Icons from '../../views/icons/Icons';
import emailjs from 'emailjs-com';

  

const BackgroundBox = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
});

const AlianceLandingPage = () => {
    // Substitua o número e a mensagem com os valores desejados
    const phoneNumber = '5518988075144'; // Formato: código do país + código de área + número
    const message = 'Olá! Me interessei pelo ERP Aliance e gostaria de saber mais!';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    useEffect(() => {
        Aos.init();
      }, []);

      const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const response = await axios.post('https://sandbox.api.mailtrap.io/api/send/3213788', {
        from: { email: 'hello@example.com', name: 'Mailtrap Test' },
        to: [{ email: formData.email }],
        subject: `Mensagem de ${formData.name}`,
        text: formData.message,
        category: 'Contact Form'
      }, {
        headers: {
          Authorization: 'Bearer 53f766efe8ffbbd4d34e90416d6f4930',
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <div>

        {/* Header com imagem de fundo */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <BackgroundBox>
                    <Container>
                    <Typography variant="h1" gutterBottom sx={{ color: '#fff', position: 'relative', zIndex: 2 }}>
                        Transforme a gestão da sua igreja com o Aliance
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ color: '#fff', position: 'relative', zIndex: 2 }}>
                        Simplicidade, eficiência e fé trabalhando juntas.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{ marginTop: 2, position: 'relative', zIndex: 2 }}>
                        Comece Agora
                    </Button>
                    </Container>
                </BackgroundBox>
            
                {/* Overlay */}
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Ajuste a opacidade conforme necessário
                    zIndex: 1,
                    }}
                />
        </Box>


        <Box sx={{ padding: '4rem 0' }}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom>
                Nós temos módulos <span style={{ color: '#6a82cc', fontWeight: 'bold' }}>incríveis</span>.
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                Ajudamos a sua igreja a crescer e se organizar com ferramentas pensadas para você.
                </Typography>
                <Grid container spacing={4}>
                {/* Cartão Financeiro */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                    }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                border: '1px solid #dcdcdc'
                            }}
                            >
                            <IconCurrencyDollar style={{ fontSize: '30px', color: 'blue' }} />
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Financeiro</Typography>
                            <Typography>
                            Controle suas finanças com entradas, saídas, relatórios financeiros e muito mais.
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>

                {/* Cartão Gestão de Membros */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                    }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                border: '1px solid #dcdcdc'
                            }}
                            >
                            <IconUsersGroup style={{ fontSize: '30px', color: 'blue' }} />
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Gestão de Membros</Typography>
                            <Typography>
                            Organize os membros da sua igreja e acompanhe o engajamento deles na igreja.
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>

                {/* Cartão Eventos e Programações */}
                <Grid item xs={12} md={4} >
                    <Card sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                    }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                border: '1px solid #dcdcdc'
                            }}
                            >
                            <IconCalendar style={{ fontSize: '30px', color: 'blue' }} />
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Eventos e Programações</Typography>
                            <Typography>
                            Crie e gerencie eventos e programações da sua igreja com facilidade.
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>

                {/* Cartão Recursos */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                    }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                border: '1px solid #dcdcdc'
                            }}
                            >
                            <IconStar style={{ fontSize: '30px', color: 'blue' }} />
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Recursos</Typography>
                            <Typography>
                            Todos os recursos que a sua igreja mantém centralizados em um só módulo.
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>

                {/* Cartão Escola Bíblica Dominical */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                    }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                border: '1px solid #dcdcdc'
                            }}
                            >
                            <IconSchool style={{ fontSize: '30px', color: 'blue' }} />
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Escola Bíblica Dominical</Typography>
                            <Typography>
                            Gerencie as aulas de EBD que foram ministradas, o professor que as aplicou, e a lição dada.
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>

                {/* Cartão Missões */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                    }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                border: '1px solid #dcdcdc'
                            }}
                            >
                            <IconTarget style={{ fontSize: '30px', color: 'blue' }} />
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Missões</Typography>
                            <Typography>
                            O objetivo da igreja é cumprir o Ide. Para isso, administre as missões que a sua igreja possui.
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>
                </Grid>
            </Container>
        </Box>

        {/* Seção Planos */}
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '4rem 0' }}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom>Planos que cabem <span style={{color: '#6a82cc', fontWeight: 'bold'}}>no orçamento!</span></Typography>
                <Typography variant="h6" align="center">Disponibilizamos 3 opções para você escolher a que mais se encaixa na sua igreja.</Typography>
                <Grid container style={{marginTop: '5%'}} spacing={4}>
                        {/* Plano Básico */}
                        <Grid item xs={12} md={4} data-aos="fade-down" data-aos-duration="1500" data-aos-once="true">
                            <Card align="center">
                                <CardContent>
                                <Typography variant="h6">BÁSICO</Typography>
                                <Typography variant="h2" sx={{ marginTop: 2 }}>
                                    R$ 79,90<span style={{ fontSize: '0.8rem' }}>/mês</span>
                                </Typography>
                                <hr />
                                <Typography sx={{fontWeight: '800', lineHeight: '3rem' }}>
                                    Recursos completos para igrejas pequenas
                                </Typography>
                                {/* Lista de funcionalidades do plano padrão */}
                                <Typography sx={{ lineHeight: '3rem' }}>Até 50 usuários</Typography>
                                <Typography sx={{ lineHeight: '3rem' }}>Até 5 departamentos</Typography>
                                <Typography sx={{ lineHeight: '3rem' }}>1 missão</Typography>
                                <hr />
                                <Button variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#ffffff', color: '#1e3a8a' }}>
                                    Escolher Plano
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Plano Padrão - Destaque com fundo azul escuro */}
                        <Grid item xs={12} md={4} data-aos="fade-up" data-aos-duration="1500" data-aos-once="true">
                            <Card sx={{ backgroundColor: '#1e3a8a', color: 'white' }} align="center">
                                <CardContent>
                                <Typography variant="h6" sx={{ color: 'white' }}>PADRÃO</Typography>
                                <Typography variant="h2" sx={{ marginTop: 2, color: 'white' }}>
                                    R$ 119,90<span style={{ fontSize: '0.8rem' }}>/mês</span>
                                </Typography>
                                <hr />
                                <Typography sx={{ color: 'white', fontWeight: '800', lineHeight: '3rem' }}>
                                    Recursos completos para igrejas médias
                                </Typography>
                                {/* Lista de funcionalidades do plano padrão */}
                                <Typography sx={{ lineHeight: '3rem' }}>Até 150 usuários</Typography>
                                <Typography sx={{ lineHeight: '3rem' }}>Até 10 departamentos</Typography>
                                <Typography sx={{ lineHeight: '3rem' }}>5 missões</Typography>
                                <hr />
                                <Button variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#ffffff', color: '#1e3a8a' }}>
                                    Escolher Plano
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Plano Premium */}
                        <Grid item xs={12} md={4} data-aos="fade-down" data-aos-duration="1500" data-aos-once="true">
                            <Card align="center">
                                <CardContent>
                                <Typography variant="h6">PREMIUM</Typography>
                                <Typography variant="h2" sx={{ marginTop: 2 }}>
                                    R$ 199<span style={{ fontSize: '0.8rem' }}>/mês</span>
                                </Typography>
                                <hr />
                                <Typography sx={{fontWeight: '800', lineHeight: '3rem' }}>
                                    Recursos completos para igrejas grandes
                                </Typography>
                                {/* Lista de funcionalidades do plano padrão */}
                                <Typography sx={{ lineHeight: '3rem' }}>Até 500 usuários</Typography>
                                <Typography sx={{ lineHeight: '3rem' }}>Até 20 departamentos</Typography>
                                <Typography sx={{ lineHeight: '3rem' }}>15 missões</Typography>
                                <hr />
                                <Button variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#ffffff', color: '#1e3a8a' }}>
                                    Escolher Plano
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                </Grid>
                <Typography align='center' style={{marginTop: '5%'}}>Para um plano superior ao Premium, contate o suporte.</Typography>
            </Container>
        </Box>

        {/* Seção de Passo a Passo */}
        <Box sx={{ backgroundColor: '#fff', padding: '4rem 0' }}>
        <Container>    
            <Grid container spacing={4} alignItems="center">
                {/* Coluna dos passos */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" align="center" gutterBottom>
                        Para começar <span style={{ color: '#6a82cc', fontWeight: 'bold' }}>é muito fácil!</span>
                    </Typography>
                    <Box>
    {/* Passo 1 */}
    <Box
        data-aos="fade-down" data-aos-duration="2000" data-aos-once="true"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        style={{ marginTop: '5%' }}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        mb={8}
        textAlign={{ xs: 'center', sm: 'left' }}
    >
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginRight: 2 }}>01</Typography>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Conta</Typography>
            <Typography variant="body1">Registre sua igreja no sistema com informações básicas: nome da igreja, seu email e senha de login.</Typography>
        </Box>
    </Box>

    {/* Passo 2 */}
    <Box
        data-aos="fade-down" data-aos-duration="2000" data-aos-once="true"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        mb={8}
        textAlign={{ xs: 'center', sm: 'left' }}
    >
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginRight: 2 }}>02</Typography>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Plano</Typography>
            <Typography variant="body1">Escolha o plano, dentre os 3 disponibilizados, que melhor atende às necessidades da sua igreja e realize o pagamento.</Typography>
        </Box>
    </Box>

    {/* Passo 3 */}
    <Box
        data-aos="fade-down" data-aos-duration="2000" data-aos-once="true"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        textAlign={{ xs: 'center', sm: 'left' }}
    >
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginRight: 2 }}>03</Typography>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Comece a Usar!</Typography>
            <Typography variant="body1">Acesse os módulos e comece a organizar sua igreja.</Typography>
        </Box>
    </Box>
</Box>

                </Grid>
            
                {/* Coluna da imagem vetorizada */}
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center">
                        <img 
                            src="https://img.freepik.com/premium-vector/mobile-login-flat-design-vector-illustration_1288538-7539.jpg" 
                            alt="Mobile Login Illustration" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
        </Box>

        {/* Seção de Princípios e Valores */}
        <Box sx={{ padding: '4rem 0' }}>
  <Container>
    <Typography variant="h2" align="center" gutterBottom>
      Nossos <span style={{ color: '#6a82cc', fontWeight: 'bold' }}>princípios e valores</span>
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {[{
        icon: <IconHeartHandshake style={{ width: '60px', height: '60px' }} />,
        title: 'Comprometimento',
        text: 'Estamos totalmente comprometidos em oferecer um serviço excepcional às igrejas de todo o Brasil. Nossa equipe está sempre disponível para atender suas necessidades e garantir que sua experiência com o Aliance seja a melhor possível.',
        overlayText: 'Jeremias 29:13'
      },
      {
        icon: <IconWall style={{ width: '60px', height: '60px' }} />,
        title: 'Edificação',
        text: 'Queremos edificar o Corpo de Cristo ao fornecer ferramentas robustas de gestão. Através de nossa plataforma, as igrejas podem otimizar suas operações, permitindo que se concentrem no que realmente importa: a missão de espalhar a palavra de Deus.',
        overlayText: 'Mateus 7:24-27'
      },
      {
        icon: <IconCross style={{ width: '60px', height: '60px' }} />,
        title: 'Glorificando a Cristo',
        text: 'Acreditamos que cada ação conta. Por isso, nosso compromisso é oferecer um serviço de alta qualidade, permitindo que as igrejas realizem suas atividades com excelência. Servir a Cristo com dedicação é o que nos motiva todos os dias. ',
        overlayText: 'Colossenses 3:23-24'
      },
      {
        icon: <IconCheck style={{ width: '60px', height: '60px' }} />,
        title: 'Qualidade',
        text: 'O Aliance é sinônimo de qualidade. Estamos comprometidos em apoiar as igrejas na sua jornada de fé e gestão, oferecendo soluções que realmente fazem a diferença, desde a administração de membros até o controle financeiro.',
        overlayText: '1 Coríntios 10:31'
      }].map((card, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Card data-aos="fade-up" data-aos-duration="1500" data-aos-once="true" sx={{
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            transition: 'transform 1.5s ease-in-out',
            
            '&:hover .overlay': {
              opacity: 1,
              visibility: 'visible'
            },
            '&:hover .content': {
              opacity: 0,
              visibility: 'hidden'
            }
          }}>
            <CardContent align="center" className="content" sx={{ transition: 'opacity 1s ease' }}>
              <Typography variant="h3" sx={{ marginBottom: 2 }}>
                {card.icon}
              </Typography>
              <Typography variant="h5">{card.title}</Typography>
              <Typography variant="body1">
                {card.text}
              </Typography>
            </CardContent>

            {/* Overlay */}
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity 1s ease',
              }}
            >
              <Typography variant="h6">{card.overlayText}</Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


        {/* Seção Quem Somos */}
        <Box sx={{ padding: '4rem 0' }} data-aos="zoom-in-right" data-aos-duration="1500" data-aos-once="true">
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        {/* Coluna do texto */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" align="center" gutterBottom>
                                Sobre nós
                            </Typography>
                            <Typography variant="body1" align="left" paragraph>
                                <i>"Enquanto comiam, Jesus tomou o pão, deu graças, partiu-o, e o deu aos seus discípulos, dizendo: "Tomem e comam; isto é o meu corpo". Em seguida tomou o cálice, deu graças e o ofereceu aos discípulos, dizendo: "Bebam dele todos vocês. <b>Isto é o meu sangue da aliança</b>, que é derramado em favor de muitos, para perdão de pecados."</i> - Mateus 26:26-28
                            </Typography>
                            <Typography variant="body1" align="left" paragraph>
                                Acreditamos que o Corpo de Cristo merece uma gestão organizada e eficiente para alcançar mais pessoas e servir melhor sua comunidade.
                            </Typography>
                            <Typography variant="body1" align="left" paragraph>
                                Nossa missão é proporcionar ferramentas que ajudem as igrejas a crescerem em suas atividades e no relacionamento com seus membros. 
                            </Typography>
                            <Typography variant="body1" align="left" paragraph>
                                Junte-se a nós e faça parte desta transformação!
                            </Typography>
                        </Grid>
                        {/* Coluna da imagem */}
                        <Grid item xs={12} md={6}>
                            <Box display="flex" justifyContent="center">
                                <img 
                                    src="https://img.freepik.com/free-vector/christian-event-abstract-concept-illustration-christian-holy-day-religious-dates-calendar-baptist-event-church-gathering-sunday-mass-music-festival-pilgrimage_335657-3653.jpg?semt=ais_hybrid" 
                                    alt="Christian Event" 
                                    style={{ maxWidth: '100%', height: 'auto' }} 
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
        </Box>

        <Box sx={{ padding: '4rem 0', backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                Entre em Contato
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                Gostaríamos de ouvir você. Envie-nos uma mensagem e responderemos o mais breve possível.
                </Typography>

                <Box
                component="form"
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
                onSubmit={handleSubmit}
                >
                {/* Nome */}
                <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Email */}
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {/* Mensagem */}
                <TextField
                    label="Mensagem"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                {/* Botão de envio */}
                <Button variant="contained" color="primary" size="large" type="submit">
                    Enviar Mensagem
                </Button>

                {/* Feedback após envio */}
                {status === 'success' && <Alert severity="success">Mensagem enviada com sucesso!</Alert>}
                {status === 'error' && <Alert severity="error">Falha ao enviar a mensagem. Tente novamente.</Alert>}
                </Box>
            </Container>
        </Box>

        {/* Rodapé */}
        <Box sx={{ backgroundColor: '#333', color: 'white', padding: '2rem 0' }}>
            <Container>
            <Typography variant="body1" align="center">
                © {new Date().getFullYear()} Aliance ERP - Todos os direitos reservados.
            </Typography>
            </Container>
        </Box>

        <Box
      component="a"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        padding: '1rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        textDecoration: 'none',
        color: '#fff',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#243b53',
        },
      }}
    >
      <IconBrandWhatsapp sx={{color: 'white', fontSize: '2rem' }} />
    </Box>
    </div>
  );
};

export default AlianceLandingPage;
