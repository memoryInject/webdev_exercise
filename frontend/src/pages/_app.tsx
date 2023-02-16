// import '@/styles/globals.css'
import Layout from '@/components/Layout';
import '@/styles/bootstrap.min.css';
import '@/styles/common.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
