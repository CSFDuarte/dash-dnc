import ChartsSection from "@/components/chartsSection";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TablesSection from "@/components/tablesSection";
import usePeople from "@/contexts/people";
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Paper, Toolbar, Typography } from "@mui/material";

export default function Home() {
  //* Lista de pessoas
  const {people, setPeople} = usePeople();

  //* Cálculos dos cartões de informação
  const {totalPeople, totalSpecialties, totalExperience, uniqueCities} = people.reduce((acc, person) => {
    return {
      totalPeople: acc.totalPeople + 1,
      totalSpecialties: acc.totalSpecialties + person.specialties.length,
      totalExperience: acc.totalExperience + person.experience,
      uniqueCities: acc.uniqueCities.includes(person.city) ? acc.uniqueCities : [...acc.uniqueCities, person.city],
    }
  }, {totalPeople: 0, totalSpecialties: 0, totalExperience: 0, uniqueCities: []})

  //* Montando a estrutura dos cartões de informação
  const infoCards = [
    {title: 'Total de pessoas', value: totalPeople},
    {title: 'Média de especialidades', value: totalSpecialties / totalPeople},
    {title: 'Média de experiência', value: totalExperience / totalPeople},
    {title: 'Cidades únicas', value: uniqueCities.length},
  ];
  return (
    <>
      <Grid container spacing={1} my={0}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {infoCards.map((card, index) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <Paper elevation={3} style={{padding: '1rem', textAlign: 'center'}}>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="h3">{card.value.toFixed(1)}</Typography>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ChartsSection/>
        </Grid>
        <Grid item xs={12}>
          <TablesSection/>
        </Grid>
      </Grid>
    </>
  );
}
