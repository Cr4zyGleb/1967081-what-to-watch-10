import './error-message.css';

type ErrorMessageProps = {
  error: string
}

function ErrorMessage({ error }: ErrorMessageProps): JSX.Element{
  return (
    <div className='error-message-add-review'> { error } </div>
  );
}

export default ErrorMessage;
