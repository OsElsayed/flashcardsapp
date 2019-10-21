import { Card } from './../../models/card.interface';
import { createAction, props } from '@ngrx/store';

export const AddCard = createAction('[Card] Add Card', props<{ card: Card }>());
export const AddCardFail = createAction('[Card] Add Card Fail');
export const AddCardSuccess = createAction('[Card] Add Card Success');

export const EditCard = createAction('[Card] Edit Card', props<{ index: number, card: Card }>());
export const EditCardFail = createAction('[Card] Edit Card Fail');
export const EditCardSuccess = createAction('[Card] Edit Card Success');

export const DeleteCard = createAction('[Card] Delete Card', props<{ index: number }>());
export const DeleteCardFail = createAction('[Card] Delete Card Fail');
export const DeleteCardSuccess = createAction('[Card] Delete Card Success');
