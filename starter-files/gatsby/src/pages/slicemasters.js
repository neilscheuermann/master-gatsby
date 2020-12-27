import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

export default function SlicemastersPage({ data }) {
  return (
    <>
      <SlicemasterGrid>
        {data.slicemasters.nodes.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Image fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
}

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    position: relative;
    margin-bottom: -2rem;
    z-index: 2;
  }

  .description {
    background: var(--yellow);
    padding: 2rem;
    margin: 1rem;
    margin-top: -6rem;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export const query = graphql`
  query MyQuery {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        description
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
