import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@features/layout';
import { AuthPage, PokedexPage, PokemonPage, PokemonsPage, ProfilePage } from '@pages';
import { ROUTES } from '@utils/constants';
import { useStore } from '@utils/contexts';

import '@assets/css/global.css';

export const AuthApp = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<AuthPage />} />
    <Route path='*' element={<Navigate to={ROUTES.AUTH} />} />
  </Routes>
);

export const App = () => {
  const {
    session: { isLoginIn }
  } = useStore();

  return (
    <BrowserRouter>
      {!isLoginIn && <AuthApp />}
      {isLoginIn && (
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
            <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
            <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path='*' element={<Navigate to={ROUTES.POKEMONS} />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
