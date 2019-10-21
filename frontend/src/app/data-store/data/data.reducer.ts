import { createReducer, on } from '@ngrx/store';
import * as action from './data.actions';
import { Card } from 'src/app/models/card.interface';

export interface DataState {
    cards: Card[];
}

export const initialState: DataState = {
    cards: []
};

const _dataReducer = createReducer(initialState,
    on(action.AddCard, (state, { card }) => {
        const cards = [...state.cards, card];
        return {
            ...state,
            cards
        };

        // let lists = state.cards;
        // lists = [...lists, card]
        // // const cards = {
        // //     ...state.cards, ...card
        // // };
        // return {
        //     ...state,
        //     cards: lists
        // }
    }),
    on(action.DeleteCard, (state, { index }) => {
        let cards = state.cards;
        cards = [...cards.slice(0, index), ...cards.slice(index + 1, cards.length)];

        return {
            ...state,
            cards
        };
    }),
    on(action.EditCard, (state, { index, card }) => {
        let cards = state.cards;
        cards = [...cards.slice(0, index), card, ...cards.slice(index + 1, cards.length)];

        return {
            ...state,
            cards
        };

    }),

);

export function dataReducer(state, action) {
    return _dataReducer(state, action);
}
