import { createReducer, on } from '@ngrx/store';
import * as action from './layout.actions';

export enum CardMode { ADD, EDIT, DELETE }
export interface LayoutState {
    mode: CardMode;
}

export const initialState: LayoutState = {
    mode: CardMode.ADD
};

const _layoutReducer = createReducer(initialState,
    on(action.AddCardMode, state => {
        return {
            ...state,
            mode: CardMode.ADD
        };
    }),
    on(action.DeleteCardMode, state => {
        return {
            ...state,
            mode: CardMode.DELETE
        };
    }),
    on(action.EditCardMode, state => {
        return {
            ...state,
            mode: CardMode.EDIT
        };

    }),

);

export function layoutReducer(state, action) {
    return _layoutReducer(state, action);
}
