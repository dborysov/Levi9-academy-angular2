import { IProduct } from './app/models/product';

export interface IAppStore {
    cart: IProduct[];
    catalog: IProduct[];
    selectedProduct: IProduct;
}
