import '@/styles/tailwind.css';
import '@/styles/globals.css';
import '@/styles/toastify.css';

import classNames from 'classnames';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import { Header } from '@/components';
import { Footer } from '@/components/Footer';
import { CartContext } from '@/contexts';
import { useCart, useHttpClient } from '@/hooks';

function App(props: AppProps) {
  const httpClient = useHttpClient();
  const { products, toggleAddProductToCart } = useCart();

  return (
    <>
      <SWRConfig value={{ fetcher: httpClient.get, errorRetryCount: 0 }}>
        <CartContext.Provider value={{ products, toggleAddProductToCart }}>
          <Header />
          <div className="w-full border-4 border-white min-h-[calc(100vh-80px)]">
            <div className={classNames('pt-10 overflow-y-auto')}>
              <props.Component {...props.pageProps} />
            </div>
          </div>
          <Footer />
        </CartContext.Provider>
      </SWRConfig>
      <ToastContainer autoClose={false} position="bottom-right" />
    </>
  );
}

export default App;
