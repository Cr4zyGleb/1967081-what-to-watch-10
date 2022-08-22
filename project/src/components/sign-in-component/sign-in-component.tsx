
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function SignInComponent(): JSX.Element {

  return (

    <div className="user-block">
      <Link to={AppRoute.Login}>
        <a href="/" className="user-block__link">Sign in</a>
      </Link>
    </div>


  );
}

export default SignInComponent;
