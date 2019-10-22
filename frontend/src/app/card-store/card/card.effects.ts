import { UsersService } from '../../_service/users.service';
import { ADD_CARD, AddCard, AddCardSuccess } from './card.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, tap, mergeMap, withLatestFrom, exhaustMap, concatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/_service/auth.service';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DataStoreState } from '..';
import { selectCards } from './card.selector';

@Injectable()
export class CardEffects {
    constructor(
        private store: Store<DataStoreState>,
        private authService: AuthService,
        private actions$: Actions,
        private usersService: UsersService) { }

    currentUser: any = this.authService.currentUser;

    // addCard$ = createEffect(() => this.actions$.pipe(
    //     ofType(AddCard),
    //     exhaustMap(action => this.usersService.UpdateUser(this.currentUser._id, action)
    //         .pipe(
    //             map(() => (AddCardSuccess)),
    //             catchError(() => EMPTY)
    //         ))
    // ));

    addCard$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AddCard),
                concatMap(action => of(action).pipe(
                    withLatestFrom(this.store.pipe(select(selectCards)))
                )),
                tap(([action, cards]) => {
                    console.log(cards)
                }),
                exhaustMap(([action, cards]) => this.usersService.updateUserById(this.currentUser._id, { 'cards': cards })
                    .pipe(
                        map(() => (AddCardSuccess)),
                        catchError(() => EMPTY)
                    )),

            ),
        { dispatch: false }
    );
}
