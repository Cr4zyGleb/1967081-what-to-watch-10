import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { IsFooterType } from '../../types/types';

function SignOutComponent({ isFooter }: IsFooterType): JSX.Element {
  const dispatch = useAppDispatch();

  const onClickHandle = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a href="/" className="user-block__link" onClick={onClickHandle}>Sign out</a>
      </li>
    </ul>
  );
}

export default SignOutComponent;
