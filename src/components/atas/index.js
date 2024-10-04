import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

const AtasList = () => {

    const handleNewUser = () => {
        console.log("Teste")
      };
  return (
    <div>
        <Typography variant="h4" gutterBottom>Lista de Atas da Primeira Igreja Batista de Presidente Prudente</Typography>
        <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary" onClick={handleNewUser}><IconPlus /> Nova Ata</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>  
            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 35
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>

            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 34
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>

            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 33
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>

            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 32
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>
            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 32
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>
            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 32
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>
            <Card sx={{ flexGrow: 1, width: '220px', margin: '16px', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Ata de reunião ordinária Nº 32
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <object
                    data="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf" // Link para o PDF
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: '16px' }}
                >
                    <p>Seu navegador não suporta PDFs. Baixe o PDF <a href="https://web.toledoprudente.edu.br/sistemas/imagens/documentosoficiais/20/edital-proadm-n-0524--matricula-presencial-ads-125.pdf">aqui</a>.</p>
                </object>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default AtasList;
