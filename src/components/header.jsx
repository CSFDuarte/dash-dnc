import ChartsSection from "@/components/chartsSection";
import TablesSection from "@/components/tablesSection";
import usePeople from "@/contexts/people";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Paper, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Header = () => {
  const {currentUser} = usePeople();
  const router = useRouter();
  //* States
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  //* Botões de ação
  const handleOpenMenu = (setAnchor) => (event) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseMenu = (setAnchor) => () => setAnchor(null);

  //* Páginas do menu e ação de cada página
  const pages = [
    {title: 'Dashboard', onClick: () => router.push('/')},
    {title: 'Cadastro', onClick: () => router.push('/cadastro')},
    {title: 'Desenvolvedores', onClick: () => router.push('/pessoas')},
  ];

  return (
    <AppBar position="static">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <img src="https://ed.escoladnc.com.br/wp-content/webp-express/webp-images/uploads/2024/04/logo-dnc-branco.png.webp" alt="logo" height={36} style={{marginRight: '1rem'}}/>
            {/* Menu Desktop */}
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map(page => (
                <Button key={page.title} onClick={page.onClick} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Typography variant="h6"textAlign="center">{page.title}</Typography>
                </Button>
              ))}
            </Box>

            {/* Menu Mobile */}
            <Box sx={{flexGrow: 1, visibility: 'hidden'}}/>
            <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}}}>
              <IconButton onClick={handleOpenMenu(setMobileMenuAnchor)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleCloseMenu(setMobileMenuAnchor)}
              >
                {pages.map(page => (
                  <MenuItem key={page.title} onClick={page.onClick}>
                    <Typography variant="h6" textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
                  <Typography variant="body1">{currentUser.name}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  )
};

export default Header;