import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import AddReview from '../../pages/add-review/add-review';
import ErrorScreen404 from '../../pages/error-screen-404/error-screen-404';
import MainPage from '../../pages/main-page/main-page';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { isCheckedAuth } from '../../utils/utils';
import FilmPlayer from '../film-player/film-player';

function App(): JSX.Element {
  const { authorizationStatus, isDataLoading } = useAppSelector((state) => state);
  if (isCheckedAuth(authorizationStatus) || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Films}>
            <Route path=':id' element={
              <MoviePage />
            }
            />
            <Route path=':id/review' element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReview />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Player} >
            <Route path=':id' element={<FilmPlayer />} />
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
