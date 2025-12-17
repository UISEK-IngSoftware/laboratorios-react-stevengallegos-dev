
import { Container, Grid } from '@mui/material'
import Header from './componentes/Header'

import './App.css'
import PokemonList from './componentes/PokemonList'

function App() {

  return (
    <>
      <Header />
      <Container>
        <PokemonList />
      </Container>
    </>
  );
}

export default App
