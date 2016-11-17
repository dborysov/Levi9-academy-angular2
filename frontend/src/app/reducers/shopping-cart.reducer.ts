import { ActionReducer, Action, } from '@ngrx/store';

export interface ICartItem {
    id: number;
    quantity: number;
}

export const cartStoreReducer: ActionReducer<ICartItem[]> = (state: ICartItem[], action: Action) => {
    switch (action.type) {
        case 'ADD':
            state = [...state];
            const positionToAdd = state.find(el => el.id === action.payload.id);

            if (positionToAdd) {
                positionToAdd.quantity += action.payload.quantity;
            } else {
                state.push({ id: action.payload.id, quantity: action.payload.quantity });
            }
            localStorage.setItem('cart', JSON.stringify(state));

            return state;

        case 'REMOVE':
            const positionToDelete = state.find(el => el.id === action.payload.id);

            if (positionToDelete) {
                state = [...state];
                state.splice(state.indexOf(positionToDelete), 1);
                localStorage.setItem('cart', JSON.stringify(state));
            }

            return state;

        case 'REMOVE_ALL':
            state = [];
            localStorage.setItem('cart', JSON.stringify(state));
            return state;

        case '@ngrx/store/init':
            localStorage.setItem('cart', JSON.stringify(state));
            return state;

        default:
            return state;
    }
};
