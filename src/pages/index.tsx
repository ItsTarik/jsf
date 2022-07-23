import { useContext } from 'react';

import { NextPageContext } from 'next';
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';

import { Cart } from '@/components/Cart';
import { StaleIndicator } from '@/components/loading';
import { CartContext } from '@/contexts';
import { ssrRedirect, routeNames, createSSRHttpClient } from '@/support';
import { endpoints } from '@/support/endpoints';
import { Product } from '@/types';

export default function Index({ ssrProducts }: { ssrProducts: Product[] }) {
  const { t } = useTranslation('home');
  const { toggleAddProductToCart } = useContext(CartContext);

  const { data: products, isValidating } = useSWR<Product[]>(endpoints.products, {
    fallbackData: ssrProducts,
  });

  return (
    <>
      <div className="w-full h-full hh">
        <h1 className="text-white text-center">{t`welcome`}</h1>
        <div className="flex justify-around border border-white">
          <StaleIndicator isValidating={isValidating}>
            <ul className="text-white">
              {products?.map((p) => (
                <li
                  key={p.id}
                  className="hover:scale-105 cursor-pointer my-9"
                  onClick={toggleAddProductToCart(p)}
                >
                  {p.label}
                </li>
              ))}
            </ul>
          </StaleIndicator>
          <Cart />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req }: NextPageContext) => {
  try {
    const httpClient = createSSRHttpClient(req);
    const ssrProducts = await httpClient.get<Product[]>(endpoints.products);

    return {
      props: { ssrProducts },
    };
  } catch (error) {
    return ssrRedirect(routeNames.error);
  }
};
