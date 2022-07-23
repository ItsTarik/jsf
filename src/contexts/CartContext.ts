import { createContext } from 'react';

import { Product } from '@/types';

interface CartContextType {
  products: Product[];
  toggleAddProductToCart: (product: Product) => () => void;
}

export const CartContext = createContext<CartContextType>({
  products: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleAddProductToCart: (product: Product) => () => ({}),
});
