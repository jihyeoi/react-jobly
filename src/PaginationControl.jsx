import React from 'react';
import './PaginationControl.css'

function PaginationControls({ next, prev, currentPage, maxPage }) {

  return (
    <div className="PaginationControl">
      <button className="PaginationControls-button" onClick={prev} disabled={currentPage === 1}>Prev</button>
      <span className="PaginationControls-text">page {currentPage} of {maxPage} </span>
      <button className="PaginationControls-button" onClick={next} disabled={currentPage === maxPage}>Next</button>
    </div>
  );
}

export default PaginationControls;