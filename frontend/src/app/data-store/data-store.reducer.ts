import { CardState } from './card/card.reducer';
import { LayoutState } from './layout/layout.reducer';

export interface DataStoreState {
    card: CardState,
    layout: LayoutState
}