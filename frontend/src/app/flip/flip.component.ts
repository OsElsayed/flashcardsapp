import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataStoreState } from '../card-store';
import { Card } from '../models/card.interface';
import { AuthService } from '../_service/auth.service';
import { UsersService } from '../_service/users.service';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.css']
})
export class FlipComponent implements OnInit {

  flipDiv: boolean;
  card: Card;
  cardsList: Card[];
  cards$: Observable<Card[]>;

  constructor(private authService: AuthService, private userService: UsersService,
    private store: Store<DataStoreState>) {
    // this.cards$ = store.pipe(select(selectCards));
    // let currentUser = this.authService.currentUser;
    // if (currentUser) {
    // this.userService.getCurrentUserCards(currentUser.email).subscribe((res) => {
    //   this.cardsList = res['user'].cards;
    //   this.card = this.cardsList[this.randomNumber(this.cardsList.length)];
    // });
    // this.cards$.subscribe(res => {
    //   res.forEach(e => this.cardsList.push(e));
    // })
    // }
  }

  ngOnInit() {
    let currentUser = this.authService.currentUser;
    if (currentUser) {
      this.userService.getCurrentUserCards(currentUser.email).subscribe((res) => {
        this.cardsList = res['user'].cards;
        this.card = this.cardsList[this.randomNumber(this.cardsList.length)];
      });
    }
  }

  rotate() {
    this.flipDiv = !this.flipDiv;
  }

  randomNumber(max: number) {
    let num = Math.floor(Math.random() * max)
    return num
  }

  refresh() {
    if (this.flipDiv) {
      this.flipDiv = !this.flipDiv;
    }
    this.card = this.cardsList[this.randomNumber(this.cardsList.length)];
  }

}
