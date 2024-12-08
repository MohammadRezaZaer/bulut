'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Product } from '@/lib/shopify/types';
import { useCart } from './cart-context';

function SubmitButton() {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-lg border bg-brand text-white h-10 tracking-wide text-brand mt-4';



  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >

        <PlusIcon className="h-5" />

        افزودن به سبد
    </button>
  );
}

export function AddToCart({ product,addCartItem }: { product: Product }) {



  return (
    <form
      action={async () => {
        addCartItem( product);

      }}
    >
      <SubmitButton  />

    </form>
  );
}
