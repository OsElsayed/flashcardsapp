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
  listOfCards: [];

  constructor(private authService: AuthService, private userService: UsersService) { }

  ngOnInit() {
    let currentUser = this.authService.currentUser;
    if (currentUser) {
      this.userService.getCurrentUserCards(currentUser.email).subscribe((res) => {
        this.listOfCards = res['user'].cards;
      });
    }
  }

  rotate() {
    this.flipDiv = !this.flipDiv;
  }

}
