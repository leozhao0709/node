import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import './_app.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
