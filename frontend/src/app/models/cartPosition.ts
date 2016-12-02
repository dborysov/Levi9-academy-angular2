import { IProduct } from './product';

export interface ICartPosition extends IProduct {
    quantity: number;
}
