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

  constructor(private authService: AuthService, private userService: UsersService) { }

  ngOnInit() {
    let currentUser = this.authService.currentUser;
    if (currentUser) {
      this.userService.getCurrentUserCards(currentUser.email).subscribe((res) => {
        let cardsList = res['user'].cards;
        this.card = cardsList[this.randomNumber(cardsList.length)];
      });
    }
  }

  rotate() {
    this.flipDiv = !this.flipDiv;
  }

  randomNumber(max: number) {
    let num = Math.floor(Math.random() * max) + 1
    return num
  }

}
