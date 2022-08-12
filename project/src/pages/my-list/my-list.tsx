import FilmCard from '../../components/film-card/filmCard';
import LogoFooter from '../../components/logo-footer/logo-footer';
import Logo from '../../components/logo/logo';
import SignOutComponent from '../../components/sign-out-component/sign-out-component';
import { useAppSelector } from '../../hooks';


function MyList(): JSX.Element {
  const { loadedFilms } = useAppSelector((state) => state);

  return (

    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <SignOutComponent />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {loadedFilms.map((film) => (
            <FilmCard film={film} key={film.id} />
          ))}
        </div>
      </section>
      <LogoFooter />
    </div>);
}

export default MyList;
