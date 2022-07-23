import { useContext } from 'react';

import { CartContext } from '@/contexts';

export const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="text-white">
      <div>cart</div>
      <ul className="text-white">
        {products?.map((p) => (
          <li key={p.id}>{p.label}</li>
        ))}
      </ul>
    </div>
  );
};
