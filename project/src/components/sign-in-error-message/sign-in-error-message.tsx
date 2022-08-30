import './sign-in-error-message.css';

type messageType = {
  message : string;
}

function SignInErrorMessage( {message} : messageType): JSX.Element | null {

  return (
    <div className='sign-in-error-message'>{message}</div> );


}

export default SignInErrorMessage;
