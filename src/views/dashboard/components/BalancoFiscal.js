import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import axios from 'axios';

const BalancoFiscal = () => {
    const [entradasPorMes, setEntradasPorMes] = useState([]);
    const [saidasPorMes, setSaidasPorMes] = useState([]);
    const [meses, setMeses] = useState([]);

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart options
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: meses, // Usando meses dinâmicos
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    const seriescolumnchart = [
        {
            name: 'Entradas',
            data: entradasPorMes, // Dados dinâmicos das entradas
        },
        {
            name: 'Saídas',
            data: saidasPorMes, // Dados dinâmicos das saídas
        },
    ];

    // Função para buscar dados financeiros
    const fetchFinancialData = async () => {
        try {
            const idCliente = localStorage.getItem('idCliente'); // Supondo que o idCliente é armazenado no localStorage
            const response = await axios.get(`http://localhost:8000/api/financas/entradasSaidasMensal?idCliente=${idCliente}`);
            setEntradasPorMes(Object.values(response.data.entradas)); // Armazenando entradas por mês
            setSaidasPorMes(Object.values(response.data.saidas)); // Armazenando saídas por mês
            setMeses(response.data.meses); // Armazenando nomes dos meses
        } catch (error) {
            console.error("Erro ao buscar dados financeiros:", error);
        }
    };

    useEffect(() => {
        fetchFinancialData();
    }, []);

    return (
        <DashboardCard title="Balanço Fiscal">
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default BalancoFiscal;
