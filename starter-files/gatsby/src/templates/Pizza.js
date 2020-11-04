import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function PizzaTemplate({ data: { pizza } }) {
  console.log('pizza>>>', pizza);
  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
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
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
