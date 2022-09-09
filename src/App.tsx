import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@common/layout';
import { AuthPage, PokemonPage, PokemonsPage, ProfilePage, SettingsPage, UsersPage } from '@pages';
import { ROUTES } from '@utils/constants';
import { useAuthState } from '@utils/firebase';

import '@assets/css/global.css';

export const AuthApp = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<AuthPage />} />
    <Route path='*' element={<Navigate to={ROUTES.AUTH} />} />
  </Routes>
);

export const App = () => {
  const authState = useAuthState();

  if (authState.isLoading) return null;

  return (
    <BrowserRouter>
      {!authState.data?.uid && <AuthApp />}
      {authState.data?.uid && (
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
            <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            <Route path={ROUTES.USERS} element={<UsersPage />} />
            <Route path='*' element={<Navigate to={ROUTES.POKEMONS} />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
