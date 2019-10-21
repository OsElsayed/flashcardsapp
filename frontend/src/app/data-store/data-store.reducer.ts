import { CardState, dataReducer } from './card/card.reducer';
import { LayoutState, layoutReducer } from './layout/layout.reducer';

export interface DataStoreState {
    card: CardState,
    layout: LayoutState
};

export const dataStoreReducer = {
    card: dataReducer,
    layout: layoutReducer
};