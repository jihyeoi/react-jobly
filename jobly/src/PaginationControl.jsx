import React from 'react';

function PaginationControls({ next, prev, currentPage, maxPage }) {

  return (
    <div>
      <button onClick={prev} disabled={currentPage === 1}>Prev</button>
      <span>Page {currentPage} of {maxPage}</span>
      <button onClick={next} disabled={currentPage === maxPage}>Next</button>
    </div>
  );
}

export default PaginationControls;