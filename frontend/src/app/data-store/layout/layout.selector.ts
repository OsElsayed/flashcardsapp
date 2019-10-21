import { LayoutState } from './layout.reducer';
import { createSelector } from '@ngrx/store';

export const selectLayout = (state: { layout: any; }) => state.layout;

export const selectLayoutCardMode = createSelector(
    selectLayout,
    (state: LayoutState) => state.mode
);
