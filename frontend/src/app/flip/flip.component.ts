import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { UsersService } from '../_service/users.service';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.css']
})
export class FlipComponent implements OnInit {

  flipDiv: boolean;
  card: {};
  cardsList: [];

  constructor(private authService: AuthService, private userService: UsersService) { }

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
