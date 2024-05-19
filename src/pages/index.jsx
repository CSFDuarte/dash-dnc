import { Button, MenuItem } from "@mui/base";
import { AppBar, Avatar, Box, Container, Grid, IconButton, ListItemIcon, Menu, Paper, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
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

export default function Home() {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const people = [
    {name: 'Caique Duarte', specialties: ['Next', 'React'], city: 'São José dos Campos - SP', experience: 11},
    {name: 'Henrique', specialties: ['React'], city: 'São José dos Campos - SP', experience: 5},
  ]

  const {totalPeople, totalSpecialties, totalExperience, uniqueCities} = people.reduce((acc, person) => {
    return {
      totalPeople: acc.totalPeople + 1,
      totalSpecialties: acc.totalSpecialties + person.specialties.length,
      totalExperience: acc.totalExperience + person.experience,
      uniqueCities: acc.uniqueCities.includes(person.city) ? acc.uniqueCities : [...acc.uniqueCities, person.city],
    }
  }, {totalPeople: 0, totalSpecialties: 0, totalExperience: 0, uniqueCities: []})

  const infoCards = [
    {title: 'Total de pessoas', value: totalPeople},
    {title: 'Média de especialidades', value: totalSpecialties / totalPeople},
    {title: 'Média de experiência', value: totalExperience / totalPeople},
    {title: 'Cidades únicas', value: uniqueCities.length},
  ];

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

  const handleOpenMenu = (setAnchor) => (event) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseMenu = (setAnchor) => () => setAnchor(null);

  const pages = [
    {title: 'Dashboard', onClick: () => console.log('Dashboard')},
    {title: 'Cadastro', onClick: () => console.log('Cadastro')},
    {title: 'Desenvolvedores', onClick: () => console.log('Desenvolvedores')},
  ];

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <img src="https://ed.escoladnc.com.br/wp-content/webp-express/webp-images/uploads/2024/04/logo-dnc-branco.png.webp" alt="logo" height={36} style={{marginRight: '1rem'}}/>
            {/* Menu Desktop */}
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map(page => (
                <Button key={page.title} onClick={page.onClick}>
                  <Typography variant="h6"textAlign="center">{page.title}</Typography>
                </Button>
              ))}
            </Box>

            {/* Menu Mobile */}
            <Box sx={{flexGrow: 1, visibility: 'hidden'}}/>
            <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}}}>
              <IconButton onClick={handleOpenMenu(setMobileMenuAnchor)}>
                <img src="/menu-aberto.png" alt="menu" height={24} />
              </IconButton>
            </Box>

            {/* Perfil */}
            <Box sx={{flexGrow: 0}}>
              <IconButton onClick={handleOpenMenu(setProfileMenuAnchor)}>
                <Avatar alt={"Usuário"} />
              </IconButton>
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleCloseMenu(setProfileMenuAnchor)}
              >
                <MenuItem>
                  <Typography variant="body1">Perfil</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid container>
        <Grid container spacing={1}>
          {infoCards.map((card, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <Paper elevation={3} style={{padding: '1rem', textAlign: 'center'}}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="h3">{card.value}</Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <ChartCard title="Desenvolvedores por experiência" data={experienceData} dataKey={"Quantidade"} />
          </Grid>
          <Grid item xs={12} md={8}>
            <ChartCard title="Especialidades mais comuns" data={specialtyData} dataKey={"Quantidade"} />
          </Grid>
        </Grid>
      </Grid>

      <Box component="footer" sx={{py: 3, px: 2, mt: 'auto', backgroundColor: "#0a3c7d", color: "#fff"}}>
        <Container maxWidth="xxl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Entre em contato</Typography>
              <Typography variant="body2">(19) 99187-4342</Typography>
              <Link href='mailto:contato@encoladnc.com.br' passHref>
                <Typography variant="body2">contato@encoladnc.com.br</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <img src="https://ed.escoladnc.com.br/wp-content/webp-express/webp-images/uploads/2024/04/logo-dnc-branco.png.webp" alt="logo" height={24} style={{marginRight: '1rem'}}/>
              <Typography variant="h6">Dashboard</Typography>
              <Typography variant="body2">&copy; 2024 DNC Treinamentos</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="end">
              <Typography variant="h6">Venhas nos conhecer</Typography>
              <Typography variant="body2">R. Justino Cobra, 61</Typography>
              <Typography variant="body2">Vila Ema, São José dos Campos - SP</Typography>
              <Typography variant="body2"></Typography>
              
              <Link href='mailto:contato@encoladnc.com.br' passHref>
                <Typography variant="body2">12243-030</Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
