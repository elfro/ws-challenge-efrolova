import { CartItem } from './models/cart.model';

export function getSubtotal(items: CartItem[]): number {
    return items.map(({ qty, price }) => price * qty)
        .reduce((subtotal, total) => subtotal += total, 0);
}