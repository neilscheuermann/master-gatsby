// Ended up not using this file, but it still worked so I kept it for reference.
import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import ToppingsFilter from '../components/ToppingsFilter';
import PizzaList from '../components/PizzaList';

export default function ToppingTemplate({ data: { pizzas } }) {
  return (
    <div>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas.nodes} />
    </div>
  );
}

// This needs to be dynamic based on the slug passed in via context in
// gatsby-node.js.
// Can access pageContext props from inside graphql`` using $.
// NOTE: Can also do these queries in `gatsby-node.js` but this way follows the
// gatsby page pattern for dynamic queries and you don't have to go back to the
// gatsby-node.js file to change the query. Is all personal preference, though.
// Would have to kill the sever when making changes in gatsby-node.js.
export const query = graphql`
  query($name: String!) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $name } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
