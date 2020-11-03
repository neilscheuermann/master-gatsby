import React from 'react';
import { graphql } from 'gatsby';

export default function PizzaTemplate() {
  return (
    <div>
      <p>Pizza Template Page</p>
    </div>
  );
}

// This needs to be dynamix based on the slug passed in via context in
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
