import React from 'react';
import { FilmComments } from '../../types/types';
import FilmComment from '../film-comment/film-comment';

type FilmCommentsColumnType = {
  columnNumber: number;
  filmComments: FilmComments;
}

function FilmCommentsColumn({ columnNumber, filmComments }: FilmCommentsColumnType): JSX.Element {
  const leftColumnNumber = 1;
  const rightColumnNumber = 2;
  const isRightColumn = (index : number) => {
    if (columnNumber === rightColumnNumber && (index + 1) % rightColumnNumber === 0) {
      return true;
    } else if (columnNumber === leftColumnNumber && (index + 1) % rightColumnNumber !== 0 ) {
      return true;
    }
    return false;
  };
  const filmColumnComments = filmComments.filter((_,index) => isRightColumn(index));
  let keyIndex = 0;
  return (
    <React.Fragment>
      {filmColumnComments.map((elem) => <FilmComment filmReview = {elem} key = {keyIndex++}/>)}
    </React.Fragment>
  );
}

export default FilmCommentsColumn;
