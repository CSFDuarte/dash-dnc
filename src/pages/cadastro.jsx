import usePeople from "@/contexts/people";
import { Button, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const possibleSpecialties = [
  'React', 'Vue', 'Angular', 'Node', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'SQL', 
  'NoSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'MariaDB'
];

export const possibleCities = [
  'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Porto Alegre - RS', 
  'Curitiba - PR', 'Recife - PE', 'Fortaleza - CE', 'Salvador - BA', 'Brasília - DF', 
  'Goiânia - GO', 'Cuiabá - MT', 'Campo Grande - MS', 'Florianópolis - SC', 'Vitória - ES', 
  'Natal - RN', 'João Pessoa - PB', 'Aracaju - SE', 'Maceió - AL', 'Teresina - PI', 
  'Boa Vista - RR', 'Manaus - AM', 'Belém - PA', 'Macapá - AP', 'Palmas - TO', 'Porto Velho - RO'
];


export default function CreateForm() {
  const { handleSubmit, control, reset} = useForm();
  const { people, setPeople } = usePeople();
  
  const handleAddDeveloper = (data) => {
    console.log(data);
    setPeople([...people, data]);
    reset();
  }

  return(
    <Paper elevation={3} style={{padding: '1rem', margin: '12px'}}>
      <Typography variant="h6">Cadastrar desenvolvedor</Typography>
      <form onSubmit={handleSubmit(handleAddDeveloper)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={control}
              defaultValue={''}
              render={({field}) => (
                <TextField
                  {...field}
                  label="Nome"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="experience"
              control={control}
              defaultValue={''}
              render={({field}) => (
                <TextField
                  {...field}
                  label="Experiência (anos)"
                  type="number"
                  required
                  fullWidth
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="specialties"
              control={control}
              defaultValue={[]}
              render={({field}) => (
                <TextField
                  {...field}
                  label="Especialidades"
                  control={control}
                  select
                  name="name"
                  required
                  fullWidth
                  SelectProps={{multiple: true}}
                >
                  {possibleSpecialties.map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="city"
              control={control}
              defaultValue={''}
              rules={{
                pattern: {
                  value: /.* - [A-Z]{2}$/,
                  message: 'A cidade deve conter a UF'
                }
              }}
              render={({field}) => (
                <TextField
                  {...field}
                  label="Cidade"
                  control={control}
                  name="city"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
