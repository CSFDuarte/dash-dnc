import usePeople from "@/contexts/people";
import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TableCard = ({title, data, rows, columns}) => (
  <Grid item xs={12} md={4}>
    <Paper elevation={3} style={{padding: '1rem', textAlign: 'center', minHeight: '360px'}}>
      <Typography variant="h6">{title}</Typography>
      <DataGrid rows={rows} columns={columns} pagination={5} />
    </Paper>
  </Grid>
);

const TablesSection = () => {
  //* Lista de pessoas
  const {people, setPeople} = usePeople();

  //* Cálculos e organização da estrutura para as tabelas
  const topExperienced = [...people.sort((a, b) => b.experience - a.experience)]

  const specialtyCounts = people.flatMap(person => person.specialties).reduce((acc, specialty) => {
    acc[specialty] = (acc[specialty] || 0) + 1;
    return acc;
  }, {});

  const topSpecialties = [...Object.entries(specialtyCounts).sort(([, a], [, b]) => b - a)]
    .map(([specialty, count], id) => ({ id, specialty, count }));

  const cityCounts = people.flatMap(person => person.city).reduce((acc, city) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const topCities = [...Object.entries(cityCounts)]
    .sort(([, a], [, b]) => b - a)
    .map(([city, count], id) => ({ id, city, count }));

  return (
    <Grid container spacing={1}>
      <TableCard title="Desenvolvedores mais experientes" rows={topExperienced} columns={[
        {field: 'name', headerName: 'Nome', flex: 2},
        {field: 'experience', headerName: 'Experiência', flex: 1, maxWidth: 150}
      ]}/>
      <TableCard title="Principais especialidades" rows={topSpecialties} columns={[
        {field: 'specialty', headerName: 'Especialidade', flex: 2},
        {field: 'count', headerName: 'Desenvolvedores', flex: 1, maxWidth: 150}
      ]}/>
      <TableCard title="Principais cidades" rows={topCities} columns={[
        {field: 'city', headerName: 'Cidade', flex: 2},
        {field: 'count', headerName: 'Desenvolvedores', flex: 1, maxWidth: 150}
      ]}/>
    </Grid>
  );

};

export default TablesSection;