import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../components/header-component/header-component';
import LogoFooter from '../../components/logo-footer/logo-footer';
import SignInErrorMessage from '../../components/sign-in-error-message/sign-in-error-message';
import { AppRoute, AuthorizationStatus, HeaderClassNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

function SignIn(): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state);
  const [passwordValid, setPasswordValid] = useState(true);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const passwordRegEx1 = /[a-zA-Z]\d/;
  const passwordRegEx2 = /\d[a-zA-Z]/;
  const message = 'Пароль должен содержать хотябы один символ и одну цифру!';
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
    navigate(AppRoute.Root);
  };

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null &&
      (passwordRegEx1.test(passwordRef.current.value) || passwordRegEx2.test(passwordRef.current.value))) {
      setPasswordValid(true);
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <div className="user-page">
      <HeaderComponent isGuest={authorizationStatus !== AuthorizationStatus.Auth} classText={HeaderClassNames.UserPageHead} />

      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
            {!passwordValid ? <SignInErrorMessage message={message} /> : ''}
          </div>
          <div className="sign-in__submit">
            <button onClick={handleSubmit} className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <LogoFooter />
    </div>);
}

export default SignIn;
