import { createReducer, on } from '@ngrx/store';
import * as action from './layout.actions';

export enum CardMode { ADD, EDIT, DELETE }
export interface LayoutState {
    mode: CardMode;
    indexEdit: number;
    indexDelete: number

}

export const initialState: LayoutState = {
    mode: CardMode.ADD,
    indexEdit: 0,
    indexDelete: 0
};

const _layoutReducer = createReducer(initialState,
    on(action.AddCardMode, state => {
        return {
            ...state,
            mode: CardMode.ADD
        };
    }),
    on(action.DeleteCardMode, (state, { index }) => {
        return {
            ...state,
            mode: CardMode.DELETE,
            indexEdit: index
        };
    }),
    on(action.EditCardMode, (state, { index }) => {
        return {
            ...state,
            mode: CardMode.EDIT,
            indexDelete: index
        };

    }),

);

export function layoutReducer(state, action) {
    return _layoutReducer(state, action);
}
