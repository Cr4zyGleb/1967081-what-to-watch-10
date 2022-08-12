
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';

function HeadGuest(): JSX.Element {

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src="img/bg-header.jpg" alt="" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <Logo />
        <div className="user-block">
          <Link to={AppRoute.Login}>
            <a href="/" className="user-block__link">Sign in</a>
          </Link>
        </div>
      </header>

    </section>
  );
}

export default HeadGuest;
