import { Card } from '../../models/card.interface';
import { createAction, props } from '@ngrx/store';

export const AddCardMode = createAction('[Layout] [Card] Add Card Mode');

export const EditCardMode = createAction('[Layout] [Card] Edit Card Mode');

export const DeleteCardMode = createAction('[Layout] [Card] Delete Card Mode');
