import { UsersService } from './../../_service/users.service';
import { ADD_CARD } from './card.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, tap, mergeMap, withLatestFrom } from 'rxjs/operators';
@Injectable()
export class CardEffects {
    constructor(private actions$: Actions, private usersService: UsersService) { }

    // addCard$ = createEffect(() => this.actions$.pipe(
    //     ofType(ADD_CARD),
    //     mergeMap(() => this.usersService.getCurrentUserData()
    //         .pipe(
    //             map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
    //             catchError(() => EMPTY)
    //         ))
    // )
    // );

}
