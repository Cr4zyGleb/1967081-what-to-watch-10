import React from 'react';
import { Link } from 'react-router-dom';
import { IsFooterType } from '../../types/types';

function Logo({isFooter}:IsFooterType): JSX.Element {

  return (
    <div className="logo">
      <Link to="/" className= {`logo__link ${isFooter ? 'logo__link--light' : ''}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default React.memo(Logo);
