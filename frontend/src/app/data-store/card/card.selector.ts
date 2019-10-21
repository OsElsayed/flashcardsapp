import { CardState } from './card.reducer';
import { DataStoreState } from '../data.reducer';
import { createSelector } from '@ngrx/store';

export const selectCardState = (state: DataStoreState) => state.card;

export const selectCards = createSelector(
    selectCardState,
    (state: CardState) => state.cards
);
