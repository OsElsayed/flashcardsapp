import { Card } from '../../models/card.interface';
import { createAction, props } from '@ngrx/store';
export const ADD_CARD = '[Card] Add Card';
export const EDIT_CARD = '[Card] Edit Card';
export const DELETE_CARD = '[Card] Delete Card';
export const LOAD_CARDS = '[Card] Load Card';


export const AddCard = createAction(ADD_CARD, props<{ card: Card }>());
export const AddCardFail = createAction('[Card] Add Card Fail');
export const AddCardSuccess = createAction('[Card] Add Card Success');

export const EditCard = createAction(EDIT_CARD, props<{ index: number, card: Card }>());
export const EditCardFail = createAction('[Card] Edit Card Fail');
export const EditCardSuccess = createAction('[Card] Edit Card Success');

export const DeleteCard = createAction(DELETE_CARD, props<{ index: number }>());
export const DeleteCardFail = createAction('[Card] Delete Card Fail');
export const DeleteCardSuccess = createAction('[Card] Delete Card Success');

export const LoadCards = createAction(LOAD_CARDS);
export const LoadCardsFail = createAction('[Card] Load Card Fail');
export const LoadCardsSuccess = createAction('[Card] Load Card Success');
