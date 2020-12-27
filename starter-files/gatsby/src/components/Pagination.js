import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

export default function Pagination({ base, pageNumber, pageSize, totalCount }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = pageNumber + 1;
  const previousPage = pageNumber - 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPreviousPage = previousPage >= 1;

  return (
    <PaginationStyles>
      <Link
        disabled={!hasPreviousPage}
        to={`${base}/${previousPage === 1 ? '' : previousPage}`}
      >
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={pageNumber === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i === 0 ? '' : i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next →
      </Link>
    </PaginationStyles>
  );
}

const PaginationStyles = styled.div`
  display: flex;
  text-align: center;
  margin: 2rem 0;
  border: solid 1px var(--grey);
  border-radius: 5px;

  & > * {
    padding: 1rem;
    flex: 1;
    text-decoration: none;
    border-right: solid 1px var(--grey);

    &[aria-current],
    &.current {
      color: var(--red);
    }

    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;
