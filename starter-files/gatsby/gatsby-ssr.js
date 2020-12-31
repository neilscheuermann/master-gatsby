import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// If you want to preserve state in Gatsby, you need to go to the highest level
// that won't unmount. That is the ROOT.
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
