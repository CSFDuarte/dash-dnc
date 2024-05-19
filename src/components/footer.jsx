import ChartsSection from "@/components/chartsSection";
import TablesSection from "@/components/tablesSection";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Paper, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


const Footer = () => {
  return (
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
  )
};

export default Footer;