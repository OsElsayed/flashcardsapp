import { CardState } from './card.reducer';
import { DataStoreState } from '../data.reducer';
import { createSelector } from '@ngrx/store';

export const selectCardState = (state: any) => state.app.card;

export const selectCards = createSelector(
    selectCardState,
    (state: CardState) => state.cards
);

export const selectUserId = createSelector(
    selectCardState,
    (state: CardState) => state.userId
);

export const selectCardByIndex = (index: number) => createSelector(selectCards, (allItems) => {
    return allItems[index];
});
