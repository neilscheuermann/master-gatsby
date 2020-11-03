import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. Qeury all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

// As seen in the docs, this is run after the initial sourcing (sanity for this
// course), but before it builds the website. Can tell by logging something then
// run `npm start` again.
export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
}
