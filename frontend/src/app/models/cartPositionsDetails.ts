import { ICartPosition } from './cartPosition';
import { IProduct } from './product';

export interface ICartPositionsDetails extends ICartPosition, IProduct {
    detailsLoaded: boolean;
}
