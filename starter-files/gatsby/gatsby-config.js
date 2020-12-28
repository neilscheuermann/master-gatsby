import dotenv from 'dotenv';

// Package allows us to reach for sensitive non `GATSBY_` env vars
// such as SANITY_TOKEN
dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
    twitter: '@slicksSlices',
  },
  plugins: [
    // Two different ways to import plugins
    // Default...
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    // and With Options...
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'huvyrrpn',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
