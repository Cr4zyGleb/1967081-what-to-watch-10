import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import AddReview from '../../pages/add-review/add-review';
import ErrorScreen404 from '../../pages/error-screen-404/error-screen-404';
import MainPage from '../../pages/main/main';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import { AppMainProps } from '../../types/types';
import PrivateRoute from '../private-route/private-route';

function App({ title, releaseDate, genre, films }: AppMainProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage title={title} releaseDate={releaseDate} genre={genre} films={films} />} />
          <Route path='films'>
            <Route path=':id' element={<MoviePage films={films} />}></Route>
            <Route path=':id/review' element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <AddReview films={films} />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path='login' element={<SignIn />} />
          <Route path='mylist' element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList films={films} />
            </PrivateRoute>
          }
          />
          <Route path='player'>
            <Route path=':id' element={<Player films={films} />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<ErrorScreen404 />}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
