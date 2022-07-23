import { useCallback, useState } from 'react';

import { toast } from 'react-toastify';

import { Product } from '@/types';

export const useCart = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const toggleAddProductToCart = useCallback(
    (product: Product) => () => {
      const isInCart = products.some((p) => p.id === product.id);

      setProducts((prevProducts) => {
        if (isInCart) {
          toast.info('product removed');

          return prevProducts.filter((p) => p.id !== product.id);
        }

        toast.success('product added');

        return [...prevProducts, product];
      });
    },
    [products]
  );

  return {
    products,
    toggleAddProductToCart,
  };
};

export default useCart;
