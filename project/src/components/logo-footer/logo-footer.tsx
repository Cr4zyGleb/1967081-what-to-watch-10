import React from 'react';
import Logo from '../logo/logo';

function LogoFooter(): JSX.Element {
  const isFooter = true;
  return (

    <footer className="page-footer" >
      <Logo isFooter = {isFooter} />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default React.memo(LogoFooter);
