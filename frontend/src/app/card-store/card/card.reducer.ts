import { createReducer, on } from '@ngrx/store';
import * as action from './card.actions';
import { Card } from 'src/app/models/card.interface';

export interface CardState {
    cards: Card[];
    userId: string;
}

export const initialState: CardState = {
    cards: [],
    userId: ''
};

const _dataReducer = createReducer(initialState,
    on(action.AddCard, (state, { card }) => {
        const cards = [...state.cards, card];
        return {
            ...state,
            cards
        };

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
    on(action.LoadCardsSuccess, (state, { cards }) => {
        return {
            ...state,
            cards: cards
        };

    }),
    on(action.LoadUser, (state, { userId }) => {
        console.log(userId);
        return {
            ...state,
            userId: userId
        };

    }),
);

export function dataReducer(state, action) {
    return _dataReducer(state, action);
}
