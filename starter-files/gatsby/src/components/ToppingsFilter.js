import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

// Can only run dynamix queries at the page level, currently.
// Can run static query anywhere, using a React hook
export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  // Get a list of all the Pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          name
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // Count how many pizzas are in each
  const toppingsWithCounts = countPizzasWithToppings(pizzas.nodes);
  // Loop over that list of toppings and display the topping and
  //  the count of the pizzas in that topping
  // Link it up......
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">all</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.name}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

// CSS
//
const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  /* Can access Link with 'a' since that's what 
     Gatsby renders it to under the hood. */
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

// Helpers
//

function countPizzasWithToppings(pizzas) {
  const toppingCountObject = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, pizza) => {
      acc[pizza.name] = (acc[pizza.name] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(toppingCountObject).map(([name, count]) => ({
    name,
    count,
  }));
}
