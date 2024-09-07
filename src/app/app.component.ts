import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin!: boolean;
  title = 'cardlaverita-v2';
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    /* this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    }); */
  }
  /* loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  } */
}
