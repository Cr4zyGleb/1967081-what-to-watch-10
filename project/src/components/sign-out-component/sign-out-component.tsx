import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function SignOutComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userAvatarUrl } = useAppSelector((state) => state);
  const onClickHandle = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img src={userAvatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <a href="/" className="user-block__link" onClick={onClickHandle}>Sign out</a>
      </li>
    </ul>
  );
}

export default SignOutComponent;
