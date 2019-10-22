import { DeleteCard, AddCard, AddCardSuccess, LoadCards, EditCard, LoadCardsSuccess } from 'src/app/card-store/card/card.actions';
import { User } from './../../models/user.interface';
import { UsersService } from '../../_service/users.service';
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

    addCard$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AddCard, EditCard, DeleteCard),
                concatMap(action => of(action).pipe(
                    withLatestFrom(this.store.pipe(select(selectCards)))
                )),
                exhaustMap(([action, cards]) => this.usersService.updateUserById(this.currentUser._id, { 'cards': cards })
                    .pipe(
                        map(() => (AddCardSuccess)),
                        catchError(() => EMPTY)
                    )),

            ),
        { dispatch: false }
    );

    loadCards$ = createEffect(() => this.actions$.pipe(
        ofType(LoadCards),
        mergeMap(() => this.usersService.getUserCardsById(this.currentUser._id)
            .pipe(
                map((result: any) => result.user),
                map((user: User) => (LoadCardsSuccess({ 'cards': user.cards }))),
                catchError(() => EMPTY)
            ))
    ));
}
