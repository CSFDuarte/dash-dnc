import usePeople from "@/contexts/people";
import { Grid, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ChartCard = ({title, data, dataKey}) => (
  <Paper elevation={3} style={{padding: '1rem', textAlign: 'center'}}>
    <Typography variant="h6">{title}</Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="Nome" />
        <YAxis />
        <Bar dataKey={dataKey} fill="#0a3c7d"/>
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);

const ChartsSection = () => {
  //* Lista de pessoas
  const {people, setPeople} = usePeople();
  
  //* Cálculos e organização da estrutura para os gráficos
  const experienceData = useMemo(() => {
    const groups = people.reduce((acc, person) => {
      const group = Math.floor(person.experience / 5) * 5;
      acc[group] = (acc[group] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(groups).map(group => {
      console.log(group, groups[group]);
      return {
        'Nome': `${group} - ${+group + 4} anos`,
        'Quantidade': groups[group],
      }
    });
  }, [people]);

  const specialtyData = useMemo(() => {
    const counts = people.flatMap(person => person.specialties)
      .reduce((acc, specialty) => {
        acc[specialty] = (acc[specialty] || 0) + 1;
        return acc;
      }, {});

    return Object.keys(counts).map(specialty => ({
      'Nome': specialty,
      'Quantidade': counts[specialty]
    })).sort((a, b) => b.Quantidade - a.Quantidade);
  }, [people]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <ChartCard title="Desenvolvedores por experiência" data={experienceData} dataKey={"Quantidade"} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ChartCard title="Especialidades mais comuns" data={specialtyData} dataKey={"Quantidade"} />
      </Grid>
    </Grid>
  )
};

export default ChartsSection;