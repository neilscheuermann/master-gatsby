import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. Qeury all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
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

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  // This was my first attempt. It still worked, but duplicated a lot of code.
  // Was nice to see Wes Bos' way that reused the `pizza.js` page! TIL; you can
  // use pages as templates, technically.
  // const toppingTemplate = path.resolve('./src/templates/ToppingTemplate.js');
  const pizzaPage = path.resolve('./src/pages/pizzas.js');

  // 2. Qeury all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);

  // 3. Loop over each topping and create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: pizzaPage,
      context: {
        topping: topping.name,
      },
    });
  });
}

// As seen in the docs, this is run after the initial sourcing (sanity for this
// course), but before it builds the website. Can tell by logging something then
// run `npm start` again.
export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
    // 3. Slicemasters
  ]);
}
