/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ProductsService } from './products';

describe('Service: ProductsApi', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProductsService]
        });
    });

    it('should ...', inject([ProductsService], (service: ProductsService) => {
        expect(service).toBeTruthy();
    }));
});
