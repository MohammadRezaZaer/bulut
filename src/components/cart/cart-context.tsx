'use client';

import type { Cart, CartItem, Product, ProductVariant } from '@/lib/shopify/types';
import React, {createContext, use, useContext, useMemo, useOptimistic, useReducer} from 'react';

export type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
  | { type: 'UPDATE_ITEM'; payload: { merchandiseId: string; updateType: UpdateType } }
  | { type: 'ADD_ITEM'; payload: {  product: Product } };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: ( product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(item: CartItem, updateType: UpdateType): CartItem | null {


  if (updateType === 'delete') return null;

  const newQuantity = updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(newQuantity, singleItemAmount.toString());

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount
      }
    }
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,

  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  // const totalAmount = calculateItemCost(quantity, variant.price.amount);
  console.log({product})
  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: product?.price,
        currencyCode: "TMN"
      }

    },
    merchandise: {

      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage
      }
    }
  };
}

function updateCartTotals(lines: CartItem[]): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce((sum, item) => sum + Number(item?.cost?.totalAmount?.amount), 0);
  const currencyCode = lines[0]?.cost?.totalAmount?.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode }
    }
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' }
    }
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  // const currentCart = state || createEmptyCart();
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { merchandiseId, updateType } = action.payload;

      console.log(action.payload)

      const updatedLines = currentCart?.lines
        .map((LineItem) =>
            LineItem.merchandise?.product?.id === merchandiseId ? updateCartItem(LineItem, updateType) : LineItem
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart?.cost?.totalAmount, amount: '0' }
          }
        };
      }

      return { ...currentCart, ...updateCartTotals(updatedLines), lines: updatedLines };
    }
    case 'ADD_ITEM': {
      const {  product } = action.payload;

      const existingItem = currentCart?.lines?.find((item) => item.merchandise?.id === product?.id);
      const updatedItem = createOrUpdateCartItem(existingItem,  product);

      const updatedLines = existingItem
        ? currentCart?.lines.map((item) => (item.merchandise.id === product.id ? updatedItem : item))
        : [...currentCart?.lines, updatedItem];

      return { ...currentCart, ...updateCartTotals(updatedLines), lines: updatedLines };
    }
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,

}: {
  children: React.ReactNode;
}) {

  const [state, dispatch] = useReducer(
      cartReducer,
      {lines: []}
  );
  // const initialCart = use(cartPromise);
  // const [optimisticCart, updateOptimisticCart] = useOptimistic({lines: [{}]}, cartReducer);

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { merchandiseId, updateType } });
  };

  const addCartItem = ( product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: {  product } });
  };

  const value = useMemo(
    () => ({
      cart: state,
      updateCartItem,
      addCartItem
    }),
    [ state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}