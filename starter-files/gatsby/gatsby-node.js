import path from 'path';
import fetch from 'isomorphic-fetch';

// Gatsby Node APIs
//

export async function sourceNodes(params) {
  await fetchBeersAndTurnIntoNodes(params);
}

// As seen in the docs, this is run after the initial sourcing (sanity for this
// course), but before it builds the website. Can tell by logging something then
// run `npm start` again.
export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  // but this runs in parallel instead of sequentially.
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
    // 3. Slicemasters
    turnSlicemastersIntoPages(params),
  ]);
}

// Helpers
//

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
async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((person) => {
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: person.slug.current,
      },
    });
  });

  // 3. Figure out how many pages there are based on how many slicemasters there
  // are, and how many per page.
  const { totalCount } = data.slicemasters;
  const pageSize = process.env.GATSBY_PAGE_SIZE;
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log(
    `There are ${totalCount} slicemasters and we will create ${totalPages} pages`
  );

  // 4. Loop from 1 to n and create the pages for them.
  for (let i = 1; i <= totalPages; i++) {
    actions.createPage({
      path: `slicemasters/${i}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: (i - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
        pageNumber: i,
      },
    });
  }
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

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of beers (can't currently use fetch in node since it's
  // current a browser API)
  //  - Need to use something in Node called isomorphic fetch instead
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  // 2. Loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        // Specifies the query name
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    // 3. Create a node for that beer
    const node = { ...beer, ...nodeMeta };
    actions.createNode(node);
  }
}
