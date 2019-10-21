import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class CardEffects {
    constructor(private actions$: Actions) { }

    //   addCard$ = createEffect(() => this.actions$.pipe(
    //     ofType('[Movies Page] Load Movies'),
    //     mergeMap(() => this.moviesService.getAll()
    //       .pipe(
    //         map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
    //         catchError(() => EMPTY)
    //       ))
    //   )
    //   );

}
