'use client';

import { MinusIcon, PlusIcon,TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { CartItem } from '@/lib/shopify/types';

function SubmitButton({ type,quantity,...props }: { type: 'plus' | 'minus' }) {
  return (
    <button
      // type="submit"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto ': type === 'minus'
        }
      )}
      {...props}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <>
          {quantity > 1 && < MinusIcon className="h-4 w-4 text-red-500 dark:text-neutral-500" />}
          {quantity == 1 && < TrashIcon className="h-4 w-4 text-red-500 dark:text-neutral-500" />}

        </>
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
    quantity
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: any;
  quantity: number;
}) {
  // const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.product.id,
    item: item,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  // const actionWithVariant = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type);
         // await actionWithVariant();
      }}
    >
      <SubmitButton type={type} quantity={quantity} />
      <p  aria-live="polite" className="sr-only" role="status">
        {/*{message}*/}
      </p>
    </form>
  );
}
