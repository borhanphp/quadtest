import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationCom = ({ dataPerPage, totalData, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  return (
    <>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink onClick={handlePrevClick} previous href="#">
            Previous
          </PaginationLink>
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number} active={number === currentPage}>
            <PaginationLink onClick={() => {
              setCurrentPage(number);
              paginate(number);
            }} href="#">
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink onClick={handleNextClick} next href="#">
            Next
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default PaginationCom;
