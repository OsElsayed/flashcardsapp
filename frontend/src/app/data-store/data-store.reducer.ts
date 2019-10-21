import { DataState } from './data/data.reducer';
import { LayoutState } from './layout/layout.reducer';

export interface DataStoreState {
    data: DataState,
    layout: LayoutState
}