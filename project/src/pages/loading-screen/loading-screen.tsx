import './loading-screen.css';
function LoadingScreen(): JSX.Element {
  return (
    <div className='loading-screen'>
      <img src='/img/loading.gif' alt='Loading...'></img>
    </div>
  );
}

export default LoadingScreen;
