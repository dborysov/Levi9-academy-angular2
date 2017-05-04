/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
