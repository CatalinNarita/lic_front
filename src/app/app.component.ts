import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

export const BASE_URL = 'https://ancient-wildwood-65338.herokuapp.com';
// export const BASE_URL = 'http://localhost:8081';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //userLoggedIn: boolean;

  constructor(public router: Router) {
  }

  ngOnInit() {
    //this.userLoggedIn = !!localStorage.getItem('access_token');
  }

}
