import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PokedexPage,PokemonsPage } from '@pages';
import { ROUTES } from '@utils/constants';

import './App.css';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
      <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
