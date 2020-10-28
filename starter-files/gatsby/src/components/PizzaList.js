import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  /* 
    Explanation of repeat, auto-fill vs fit, minmax(), etc...
    https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/  
  */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  /* 
    'subgrid' says to take your row sizing not from the 
    PizzaStyles grid, but from the PizzaGridStyls grid

    Subgrid not yet available in Chrome. Below will set up a backup.
    Says, "try to run 'grid-template-rows: subgrid', and if it doesn't 
    work, then run what's in the code block"
  */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  /* 
    First checks if the variable '--rows' exists, and uses 'subgrid' if not.
  */
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2 className="mark">{pizza.name}</h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
