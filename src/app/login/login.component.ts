import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

const BAD_CREDENTIALS_RESPONSE_CODE = 500;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  username: string;
  password: string;
  invalidCredentials = false;
  loading = false;

  constructor(private loginService: LoginService,
              private router: Router) {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['dashboard']);
    }

  }

  doLogin() {
    this.loading = true;
    this.loginService.checkUserRole(this.username)
      .subscribe(data => {
        if (data.roleType === 'ROLE_ADMIN') {
          this.requestAccessToken(this.username, this.password);
        } else {
          this.loading = false;
          this.invalidCredentials = true;
        }
      },
        error => {
        if (error.status === BAD_CREDENTIALS_RESPONSE_CODE) {
            console.log(error);
            this.loading = false;
            this.invalidCredentials = true;
          }
        });
  }

  requestAccessToken(username: string, password: string) {
    this.loginService.requestAccessToken(username, password)
      .subscribe(
        data => {
          this.invalidCredentials = false;
          localStorage.setItem('access_token', data.access_token);
          this.redirectUser();
          this.loading = false;
        });
  }

  redirectUser(): void {
    this.router.navigate(['dashboard']);
  }

}


