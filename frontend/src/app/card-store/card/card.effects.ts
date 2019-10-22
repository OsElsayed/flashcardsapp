import { UsersService } from '../../_service/users.service';
import { ADD_CARD, AddCard, AddCardSuccess } from './card.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, tap, mergeMap, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { AuthService } from 'src/app/_service/auth.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class CardEffects {
    constructor(private authService: AuthService, private actions$: Actions, private usersService: UsersService) { }
    currentUser: any = this.authService.currentUser;

    addCard$ = createEffect(() => this.actions$.pipe(
        ofType(AddCard),
        exhaustMap(action => this.usersService.UpdateUser(this.currentUser._id, action)
            .pipe(
                map(() => (AddCardSuccess)),
                catchError(() => EMPTY)
            ))
    )
    );

}
