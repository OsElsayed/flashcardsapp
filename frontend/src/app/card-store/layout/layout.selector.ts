import { DataStoreState } from '../data.reducer';
import { LayoutState } from './layout.reducer';
import { createSelector } from '@ngrx/store';

export const selectLayout = (state: any) => state.app.layout;

export const selectLayoutCardMode = createSelector(
    selectLayout,
    (state: LayoutState) => state.mode
);

export const selectLayoutIndexEdit = createSelector(
    selectLayout,
    (state: LayoutState) => state.indexEdit
);

export const selectLayoutCurrentEditCard = createSelector(
    selectLayout,
    (state: LayoutState) => state.indexEdit
);