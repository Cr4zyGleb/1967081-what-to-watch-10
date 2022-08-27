import { IsHeaderType } from '../../types/types';
import SignInComponent from '../sign-in-component/sign-in-component';
import Logo from '../logo/logo';
import SignOutComponent from '../sign-out-component/sign-out-component';
import BreadcrumbsComponent from '../breadcrumbs-component/breadcrumbs-component';
import { HeaderClassNames } from '../../const';
import React from 'react';

function HeaderComponent({isGuest, filmId, classText} : IsHeaderType): JSX.Element {
  const GetHeaderClassName = () => {
    let addClassName = '';
    const defaultClassName = 'page-header';
    if (classText === HeaderClassNames.UserPageHead) {
      addClassName = classText;
    } else {
      addClassName = isGuest ? '' : classText;
    }

    return `${defaultClassName} ${addClassName}`;
  };
  return (
    <header className= {GetHeaderClassName()}>
      <Logo />
      {filmId ? <BreadcrumbsComponent filmId = {filmId}/> : ''}
      {isGuest ? <SignInComponent/> : <SignOutComponent />}
    </header>
  );
}

export default React.memo(HeaderComponent);
