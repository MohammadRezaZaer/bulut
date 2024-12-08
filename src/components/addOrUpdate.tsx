import {CartItem, LineItem} from "@/lib/shopify/types";
import {EditItemQuantityButton} from "@/components/cart/edit-item-quantity-button";
import React from "react";
import {UpdateType, useCart} from "@/components/cart/cart-context";
import {AddToCart} from "@/components/cart/add-to-cart";

export function AddOrUpdate(props: {
    LineItem: LineItem,
}) {
    const { cart,updateCartItem,addCartItem } = useCart();

    const currentLine = cart?.lines.find(
        (LineItem) => LineItem.merchandise?.product?.id === props.LineItem.id
    );
    console.log({cart,currentLine,tt:props.LineItem})
    return <>
        {currentLine?.quantity && <div
            className="flex w-full h-10 flex-row items-center justify-center rounded-lg border border-brand dark:border-neutral-700 mt-4">
            <EditItemQuantityButton
                item={currentLine}
                type="plus"
                optimisticUpdate={updateCartItem}
                quantity={currentLine?.quantity}
            />
            <p className="w-6 mb-1 text-center">
                <span className="w-full text-sm">{currentLine?.quantity}</span>
            </p>

            <EditItemQuantityButton
                item={currentLine}
                type="minus"
                quantity={currentLine?.quantity}
                optimisticUpdate={updateCartItem}
            />
        </div>}
        {!currentLine?.quantity && <AddToCart product={props.LineItem} addCartItem={addCartItem}/>}


    </>;
}